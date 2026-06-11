/* Progressive enhancement for the dynamic bits of the static site:
   comments and the newsletter form. If the API isn't reachable (e.g. the
   portable file:// build), the sections quietly degrade. */
(function () {
  var esc = function (s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  };

  /* ---------- comments ---------- */
  var section = document.querySelector("[data-comments]");
  if (section) {
    var path = section.getAttribute("data-path");
    var list = section.querySelector("[data-comments-list]");
    var form = section.querySelector("[data-comment-form]");
    var loadedAt = Date.now();

    fetch("/api/comments?path=" + encodeURIComponent(path))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.comments || !d.comments.length) {
          list.innerHTML = '<p class="comments-empty">No comments yet — be the first.</p>';
          return;
        }
        list.innerHTML = d.comments.map(function (c) {
          return '<div class="comment"><div class="comment-meta"><strong>' + esc(c.author) +
            "</strong><time>" + esc(c.created_at.slice(0, 10)) + "</time></div><p>" +
            esc(c.body) + "</p></div>";
        }).join("");
      })
      .catch(function () { section.style.display = "none"; });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("button");
        btn.disabled = true;
        fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: path,
            author: form.author.value,
            body: form.body.value,
            website: form.website.value,
            t: loadedAt
          })
        })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            btn.disabled = false;
            var note = form.querySelector(".comment-form-note");
            if (d.ok) {
              form.reset();
              note.textContent = d.message || "Thanks! Your comment is awaiting review.";
              note.classList.add("ok");
            } else {
              note.textContent = d.error || "Something went wrong — try again.";
            }
          })
          .catch(function () { btn.disabled = false; });
      });
    }
  }

  /* ---------- newsletter ---------- */
  document.querySelectorAll("[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".newsletter-note");
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.value, website: form.website.value })
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.ok) {
            form.reset();
            note.textContent = d.message || "You're on the list! 🐾";
            note.classList.add("ok");
          } else {
            note.textContent = d.error || "Something went wrong — try again.";
          }
        })
        .catch(function () {
          note.textContent = "Couldn't reach the server — try again later.";
        });
    });
  });
})();
