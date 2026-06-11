/* Admin client behaviors: build status pill, markdown preview, image
   uploads, slug derivation, list filtering, delete confirmations. */
(function () {
  var csrf = document.querySelector('meta[name="csrf"]')?.content || "";

  /* build status pill (sidebar) */
  var pill = document.getElementById("build-pill");
  if (pill) {
    var poll = function () {
      fetch("/admin/api/build-status")
        .then(function (r) { return r.json(); })
        .then(function (s) {
          var state = s.status === "never-built" ? "building" : s.status;
          pill.dataset.state = state;
          pill.textContent =
            state === "building" ? "publishing…" :
            state === "error" ? "publish failed" : "site is live";
          pill.title = s.lastError || "";
          setTimeout(poll, state === "building" ? 2000 : 15000);
        })
        .catch(function () { setTimeout(poll, 15000); });
    };
    poll();
  }

  /* markdown live preview */
  var body = document.getElementById("md-body");
  var preview = document.getElementById("md-preview");
  if (body && preview) {
    var timer = null;
    var render = function () {
      fetch("/admin/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrf },
        body: JSON.stringify({ md: body.value })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          preview.classList.remove("muted");
          preview.innerHTML = d.html || "";
        });
    };
    body.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(render, 400);
    });
    if (body.value.trim()) render();
  }

  /* image upload: shared file picker */
  function pickAndUpload(cb) {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function () {
      if (!input.files[0]) return;
      var fd = new FormData();
      fd.append("image", input.files[0]);
      fetch("/admin/api/upload", { method: "POST", headers: { "x-csrf-token": csrf }, body: fd })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.url) cb(d.url);
          else alert(d.error || "Upload failed");
        })
        .catch(function () { alert("Upload failed"); });
    };
    input.click();
  }

  document.querySelectorAll("[data-upload-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      pickAndUpload(function (url) {
        document.querySelector('[name="' + btn.dataset.uploadTo + '"]').value = url;
      });
    });
  });

  document.querySelectorAll("[data-upload-insert]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      pickAndUpload(function (url) {
        var md = "\n![](" + url + ")\n";
        var start = body.selectionStart || body.value.length;
        body.value = body.value.slice(0, start) + md + body.value.slice(start);
        body.dispatchEvent(new Event("input"));
      });
    });
  });

  /* slug derivation: fills the slug field from the title until it's edited */
  var src = document.querySelector("[data-slug-source]");
  var target = document.querySelector("[data-slug-target]");
  if (src && target) {
    var touched = Boolean(target.value);
    target.addEventListener("input", function () { touched = true; });
    src.addEventListener("input", function () {
      if (touched) return;
      target.value = src.value.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
    });
  }

  /* client-side row filter (encyclopedia question lists) */
  var filter = document.querySelector("[data-filter-rows]");
  if (filter) {
    filter.addEventListener("input", function () {
      var q = filter.value.toLowerCase().trim();
      document.querySelectorAll("tr[data-filter]").forEach(function (tr) {
        tr.style.display = !q || tr.dataset.filter.indexOf(q) !== -1 ? "" : "none";
      });
    });
  }

  /* delete confirmations */
  document.querySelectorAll("form[data-confirm]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!confirm(form.dataset.confirm)) e.preventDefault();
    });
  });
})();
