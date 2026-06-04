#!/usr/bin/env python3
"""
Generate seven publication-quality figures for the narrative review
"Mary Magdalene and the Memory of Women's Authority in Early Christianity."
Outputs PNG (300 dpi) and SVG for each figure into ./figures/
"""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle
from matplotlib.lines import Line2D
import numpy as np

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "figures")
os.makedirs(OUT, exist_ok=True)

# ----- shared style -----
plt.rcParams.update({
    "font.family": "DejaVu Serif",
    "font.size": 11,
    "axes.titlesize": 13,
    "axes.titleweight": "bold",
    "savefig.bbox": "tight",
    "savefig.facecolor": "white",
    "figure.facecolor": "white",
})

# muted scholarly palette
INK      = "#1f2933"
ERASE    = "#9b2226"   # deep red  - erasure
CONTEST  = "#386641"   # green     - contestation
RECLAIM  = "#1d3557"   # blue      - reclamation
GOLD     = "#bc8a3c"
GREY     = "#6b705c"
LIGHT    = "#e9ecef"


def save(fig, name):
    for ext in ("png", "svg"):
        fig.savefig(os.path.join(OUT, f"{name}.{ext}"), dpi=300)
    plt.close(fig)
    print("wrote", name)


# =====================================================================
# FIGURE 1 — Memory timeline (horizontal, alternating callouts)
# =====================================================================
def fig1_memory_timeline():
    events = [
        (30,   "c. 30 CE", "Canonical witness:\nfirst to the empty tomb\n& first sent to proclaim", RECLAIM),
        (210,  "c. 3rd c.", "Hippolytus:\nwomen as 'apostles\nto the apostles'", CONTEST),
        (591,  "591 CE",   "Gregory the Great:\nconflation → 'penitent\nprostitute'", ERASE),
        (850,  "9th–12th c.", "Title fixed:\n'apostola\napostolorum'", CONTEST),
        (1969, "1969",     "Roman Calendar:\nthree figures\nseparated", RECLAIM),
        (2016, "2016",     "Pope Francis:\nelevated to a\nFEAST", RECLAIM),
    ]
    fig, ax = plt.subplots(figsize=(13, 5.2))
    # non-linear x positions (evenly spaced slots) to avoid crowding
    xs = np.linspace(0.07, 0.93, len(events))
    ax.axhline(0.5, color=INK, lw=2.4, zorder=1)
    # era band labels
    for i, ((yr, lbl, txt, col), x) in enumerate(zip(events, xs)):
        up = (i % 2 == 0)
        y_text = 0.78 if up else 0.22
        y_stem = 0.5
        ax.plot([x, x], [y_stem, 0.62 if up else 0.38], color=col, lw=1.6, zorder=2)
        ax.scatter([x], [y_stem], s=140, color=col, edgecolor="white", lw=1.5, zorder=4)
        box = FancyBboxPatch((x-0.085, y_text-0.115), 0.17, 0.23,
                             boxstyle="round,pad=0.012,rounding_size=0.02",
                             linewidth=1.4, edgecolor=col, facecolor="white", zorder=3)
        ax.add_patch(box)
        ax.text(x, y_text+0.065, lbl, ha="center", va="center",
                fontsize=10.5, fontweight="bold", color=col, zorder=5)
        ax.text(x, y_text-0.028, txt, ha="center", va="center",
                fontsize=8.6, color=INK, zorder=5)
    # legend for the three movements
    handles = [
        Line2D([0],[0], marker='o', color='w', markerfacecolor=ERASE, markersize=11, label='Erasure'),
        Line2D([0],[0], marker='o', color='w', markerfacecolor=CONTEST, markersize=11, label='Contestation'),
        Line2D([0],[0], marker='o', color='w', markerfacecolor=RECLAIM, markersize=11, label='Reclamation / witness'),
    ]
    ax.legend(handles=handles, loc="lower center", ncol=3, frameon=False,
              bbox_to_anchor=(0.5, -0.04), fontsize=10)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1)
    ax.axis("off")
    ax.set_title("Figure 1.  The contested memory of Mary Magdalene, 1st–21st centuries",
                 pad=14)
    # subtle arrow of time
    ax.annotate("", xy=(0.97, 0.5), xytext=(0.03, 0.5),
                arrowprops=dict(arrowstyle="-|>", color=INK, lw=2.4), zorder=0)
    save(fig, "fig1_memory_timeline")


# =====================================================================
# FIGURE 2 — The conflation diagram (3 -> 1 -> 3)
# =====================================================================
def fig2_conflation():
    fig, ax = plt.subplots(figsize=(12, 6.4))
    ax.set_xlim(0, 12); ax.set_ylim(0, 8); ax.axis("off")

    sources = [
        ("Mary Magdalene", "Luke 8:2; John 20\nresurrection witness", 6.6),
        ("The 'sinful woman'", "Luke 7:36–50\nanonymous; anoints Jesus", 4.0),
        ("Mary of Bethany", "John 11–12\nsister of Martha & Lazarus", 1.4),
    ]
    for name, sub, y in sources:
        box = FancyBboxPatch((0.3, y-0.62), 3.0, 1.24,
                             boxstyle="round,pad=0.05,rounding_size=0.12",
                             linewidth=1.6, edgecolor=RECLAIM, facecolor="#eef2f7")
        ax.add_patch(box)
        ax.text(1.8, y+0.16, name, ha="center", va="center", fontsize=10.5,
                fontweight="bold", color=RECLAIM)
        ax.text(1.8, y-0.34, sub, ha="center", va="center", fontsize=8.2, color=INK)
        arr = FancyArrowPatch((3.4, y), (5.25, 4.0),
                              arrowstyle="-|>", mutation_scale=16,
                              color=GREY, lw=1.7, connectionstyle="arc3,rad=0.0")
        ax.add_patch(arr)

    # composite node
    comp = FancyBboxPatch((5.35, 2.95), 3.1, 2.1,
                          boxstyle="round,pad=0.05,rounding_size=0.12",
                          linewidth=2.2, edgecolor=ERASE, facecolor="#f7e9e9")
    ax.add_patch(comp)
    ax.text(6.9, 4.5, "THE COMPOSITE\n'MAGDALENE'", ha="center", va="center",
            fontsize=11, fontweight="bold", color=ERASE)
    ax.text(6.9, 3.55, "penitent prostitute", ha="center", va="center",
            fontsize=9.5, style="italic", color=ERASE)
    ax.text(6.9, 3.2, "Gregory the Great,\nHomily 33 (591 CE)", ha="center", va="center",
            fontsize=8.2, color=INK)

    # arrow to separation
    arr = FancyArrowPatch((8.45, 4.0), (9.15, 4.0), arrowstyle="-|>",
                          mutation_scale=18, color=GREY, lw=2.0)
    ax.add_patch(arr)
    ax.text(8.8, 4.42, "1,378 yrs", ha="center", fontsize=8, color=GREY, style="italic")

    # re-separated nodes
    seps = [(6.6, "Mary Magdalene", "feast, 22 July"),
            (4.0, "Sinful woman", "left anonymous"),
            (1.4, "Mary of Bethany", "29 July")]
    for y, name, sub in seps:
        box = FancyBboxPatch((9.2, y-0.55), 2.55, 1.1,
                             boxstyle="round,pad=0.05,rounding_size=0.12",
                             linewidth=1.6, edgecolor=RECLAIM, facecolor="#eef2f7")
        ax.add_patch(box)
        ax.text(10.47, y+0.12, name, ha="center", va="center", fontsize=9.6,
                fontweight="bold", color=RECLAIM)
        ax.text(10.47, y-0.28, sub, ha="center", va="center", fontsize=8, color=INK)
        arr = FancyArrowPatch((9.15, 4.0), (9.2, y), arrowstyle="-|>",
                              mutation_scale=14, color=GREY, lw=1.5)
        ax.add_patch(arr)

    ax.text(1.8, 7.7, "Three distinct figures", ha="center", fontsize=10.5,
            fontweight="bold", color=RECLAIM)
    ax.text(6.9, 7.7, "Western conflation", ha="center", fontsize=10.5,
            fontweight="bold", color=ERASE)
    ax.text(10.47, 7.7, "1969 separation", ha="center", fontsize=10.5,
            fontweight="bold", color=RECLAIM)
    ax.text(6.9, 0.45,
            "The Eastern Orthodox tradition never accepted the conflation.",
            ha="center", fontsize=8.6, style="italic", color=GREY)
    ax.set_title("Figure 2.  The conflation and re-separation of 'Mary Magdalene'",
                 pad=12)
    save(fig, "fig2_conflation")


# =====================================================================
# FIGURE 3 — Junia textual-history timeline
# =====================================================================
def fig3_junia():
    fig, ax = plt.subplots(figsize=(13.5, 4.8))
    # reading by period: 1 = feminine, 0 = masculine
    # each entry: (year, value, label, (dx, dy) offset in points, ha)
    points = [
        (100,  1, "Patristic &\nmedieval:\nfeminine",            (0, 30),   "center"),
        (1280, 0, "Giles of Rome\n(13–14th c.):\nfirst masculine",(-10, -34),"center"),
        (1516, 1, "Erasmus 1516:\nfeminine accent",              (-30, 30),  "center"),
        (1898, 1, "Nestle 1898:\nfeminine",                      (-86, 60),  "center"),
        (1927, 0, "Nestle 1927\n(13th ed.):\nmasculine 'Junias'",(0, -36),   "center"),
        (1998, 1, "Nestle-Aland\n1998: reverted to\nfeminine 'Junia'",(70, 30),"left"),
    ]
    # step line
    yrs = [p[0] for p in points] + [2025]
    vals = [p[1] for p in points] + [points[-1][1]]
    ax.step(yrs, vals, where="post", color=INK, lw=2.2, zorder=2)
    for yr, v, lbl, off, ha in points:
        col = RECLAIM if v == 1 else ERASE
        ax.scatter([yr], [v], s=110, color=col, edgecolor="white", lw=1.4, zorder=3)
        ax.annotate(lbl, (yr, v),
                    xytext=off, textcoords="offset points",
                    ha=ha, va="bottom" if v == 1 else "top",
                    fontsize=8.2, color=col,
                    arrowprops=dict(arrowstyle="-", color=col, lw=0.8,
                                    relpos=(0.5, 0.0 if v == 1 else 1.0)))
    ax.set_yticks([0, 1])
    ax.set_yticklabels(["read as\nMASCULINE\n('Junias')", "read as\nFEMININE\n('Junia')"],
                       fontsize=9)
    ax.set_ylim(-0.7, 1.9)
    ax.set_xlim(50, 2160)
    ax.set_xlabel("Year (CE)")
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(GREY)
    ax.spines["bottom"].set_color(GREY)
    ax.set_title("Figure 3.  The textual history of Junia (Romans 16:7):\n'prominent among the apostles'",
                 pad=12)
    ax.text(0.5, -0.34,
            "The masculine name 'Junias' is unattested in any ancient source; the feminine 'Junia' is widely attested.",
            transform=ax.transAxes, ha="center", fontsize=8.4, style="italic", color=GREY)
    save(fig, "fig3_junia_timeline")


# =====================================================================
# FIGURE 4 — Peter-vs-Mary motif comparison matrix
# =====================================================================
def fig4_peter_mary():
    fig, ax = plt.subplots(figsize=(12.5, 5.7))
    ax.set_xlim(0, 12.5); ax.set_ylim(0, 6.9); ax.axis("off")

    cols = ["Gospel of Mary", "Gospel of Thomas\n(logion 114)", "Pistis Sophia"]
    col_x = [3.3, 6.55, 9.8]
    rows = [
        ("Date / MS", ["2nd c.; Berlin\nCodex + Gk frr.",
                        "Coptic NHC II;\nGk Oxyrhynchus",
                        "3rd–4th c.;\nAskew Codex"]),
        ("Peter's stance", ["'Did he prefer her\nto us?' — doubts a\nwoman's revelation",
                            "'Women are not\nworthy of life'",
                            "'We cannot endure\nthis woman… she\nspeaks many times'"]),
        ("Mary's role", ["Relays the\nSaviour's secret\nteaching",
                         "Disputed disciple;\nmust be 'made male'",
                         "Dominant\ninterlocutor /\nquestioner"]),
        ("Resolution", ["Levi defends her:\n'he loved her\nmore than us'",
                        "Ambivalent — 'make\nher male' to enter\nthe kingdom",
                        "Jesus repeatedly\naffirms Mary"]),
    ]
    row_y = [5.0, 3.75, 2.5, 1.25]
    col_colors = [CONTEST, GOLD, CONTEST]

    # header
    for cx, cname, cc in zip(col_x, cols, col_colors):
        hb = FancyBboxPatch((cx-1.5, 5.6), 3.0, 0.9,
                            boxstyle="round,pad=0.02,rounding_size=0.06",
                            linewidth=0, facecolor=cc)
        ax.add_patch(hb)
        ax.text(cx, 6.05, cname, ha="center", va="center", color="white",
                fontsize=9.6, fontweight="bold")
    # row labels + cells
    for (rlabel, cells), ry in zip(rows, row_y):
        ax.text(1.05, ry, rlabel, ha="center", va="center", fontsize=9.4,
                fontweight="bold", color=INK, rotation=0)
        for cx, cell, cc in zip(col_x, cells, col_colors):
            cb = FancyBboxPatch((cx-1.5, ry-0.52), 3.0, 1.04,
                                boxstyle="round,pad=0.02,rounding_size=0.06",
                                linewidth=1.2, edgecolor=LIGHT, facecolor="#fbfbf9")
            ax.add_patch(cb)
            ax.text(cx, ry, cell, ha="center", va="center", fontsize=8.0, color=INK)
    # divider under header
    ax.plot([0.2, 11.4], [5.4, 5.4], color=GREY, lw=0.8)
    ax.set_title("Figure 4.  The Peter–Mary motif across three non-canonical texts",
                 pad=10)
    ax.text(6.25, 0.35,
            "A recurring literary cipher for second–third-century contests between charismatic-revelatory and institutional-apostolic authority.",
            ha="center", fontsize=8.4, style="italic", color=GREY)
    save(fig, "fig4_peter_mary_matrix")


# =====================================================================
# FIGURE 5 — Three-movements conceptual framework
# =====================================================================
def fig5_framework():
    fig, ax = plt.subplots(figsize=(12.5, 5.6))
    ax.set_xlim(0, 12.5); ax.set_ylim(0, 6); ax.axis("off")

    panels = [
        (ERASE, "ERASURE", "Patriarchal overwriting",
         "• Gregory's conflation (591)\n• 'Harlotisation' (Schaberg)\n• Junia → 'Junias'\n• Pastorals & household codes\n• Tertullian's exclusions"),
        (CONTEST, "CONTESTATION", "Heterodox counter-memory",
         "• Gospel of Mary\n• Gospel of Philip (koinōnos)\n• Thomas, logion 114\n• Pistis Sophia\n• Peter-vs-Mary motif"),
        (RECLAIM, "RECLAMATION", "Feminist recovery",
         "• Schüssler Fiorenza (1983)\n• King; Schaberg; Pagels\n• de Boer; Brock\n• + internal self-critique\n• 2016 feast restored"),
    ]
    px = [2.1, 6.25, 10.4]
    for (col, title, sub, body), x in zip(panels, px):
        box = FancyBboxPatch((x-1.85, 0.7), 3.7, 4.0,
                             boxstyle="round,pad=0.05,rounding_size=0.14",
                             linewidth=2.0, edgecolor=col, facecolor="white")
        ax.add_patch(box)
        head = FancyBboxPatch((x-1.85, 3.75), 3.7, 0.95,
                              boxstyle="round,pad=0.02,rounding_size=0.14",
                              linewidth=0, facecolor=col)
        ax.add_patch(head)
        ax.text(x, 4.42, title, ha="center", va="center", color="white",
                fontsize=12.5, fontweight="bold")
        ax.text(x, 4.0, sub, ha="center", va="center", color="white",
                fontsize=8.8, style="italic")
        ax.text(x, 2.25, body, ha="center", va="center", color=INK, fontsize=8.8,
                linespacing=1.6)
    # connecting arrows
    for x0, x1 in [(3.95, 4.4), (8.1, 8.55)]:
        arr = FancyArrowPatch((x0, 2.7), (x1, 2.7), arrowstyle="-|>",
                              mutation_scale=20, color=GREY, lw=2.2)
        ax.add_patch(arr)
    # overarching label
    ax.text(6.25, 5.35, "A single contested memory of women's authority",
            ha="center", fontsize=11, fontweight="bold", color=INK)
    ax.text(6.25, 0.28,
            "Three phases of one continuing argument — engaged at the level of memory, not naive historical recovery.",
            ha="center", fontsize=8.4, style="italic", color=GREY)
    ax.set_title("Figure 5.  Erasure → Contestation → Reclamation: the analytic framework",
                 pad=10)
    save(fig, "fig5_three_movements")


# =====================================================================
# FIGURE 6 — Mary's canonical appearances (grouped bar / presence matrix)
# =====================================================================
def fig6_canonical():
    fig, ax = plt.subplots(figsize=(11, 5.2))
    gospels = ["Mark", "Matthew", "Luke", "John"]
    moments = ["At the\ncrucifixion", "At the\nburial",
               "At the empty\ntomb", "Resurrection\nappearance"]
    # 1 = present/affirmed, 0.5 = present but secondary (Mark 16:9 longer ending), 0 = absent
    data = np.array([
        [1, 1, 1, 0.5],   # Mark (16:9 longer ending -> secondary)
        [1, 1, 1, 1],     # Matthew
        [0, 0, 1, 0],     # Luke (no appearance to Mary; women at tomb)
        [1, 0, 1, 1],     # John (not at burial scene by name)
    ])
    # NB Luke: present among women at crucifixion 'at a distance' but not named there -> 0
    cmap_colors = {0: "#f1f1ee", 0.5: GOLD, 1: RECLAIM}
    for i, g in enumerate(gospels):
        for j, m in enumerate(moments):
            v = data[i, j]
            ax.add_patch(Rectangle((j, len(gospels)-1-i), 0.92, 0.92,
                                    facecolor=cmap_colors[v],
                                    edgecolor="white", lw=2))
            if v == 1:
                ax.text(j+0.46, len(gospels)-1-i+0.46, "●", ha="center",
                        va="center", color="white", fontsize=14)
            elif v == 0.5:
                ax.text(j+0.46, len(gospels)-1-i+0.46, "◐", ha="center",
                        va="center", color="white", fontsize=14)
    ax.set_xticks([j+0.46 for j in range(len(moments))])
    ax.set_xticklabels(moments, fontsize=9.5)
    ax.set_yticks([len(gospels)-1-i+0.46 for i in range(len(gospels))])
    ax.set_yticklabels(gospels, fontsize=11, fontweight="bold")
    ax.set_xlim(-0.1, len(moments)); ax.set_ylim(-0.15, len(gospels))
    ax.set_aspect("equal")
    for s in ax.spines.values():
        s.set_visible(False)
    ax.tick_params(length=0)
    # legend
    handles = [
        Line2D([0],[0], marker='s', color='w', markerfacecolor=RECLAIM, markersize=13, label='Named & present'),
        Line2D([0],[0], marker='s', color='w', markerfacecolor=GOLD, markersize=13, label='Secondary text (Mark 16:9 longer ending)'),
        Line2D([0],[0], marker='s', color='w', markerfacecolor="#f1f1ee", markeredgecolor=GREY, markersize=13, label='Not named at this moment'),
    ]
    ax.legend(handles=handles, loc="upper center", bbox_to_anchor=(0.5, -0.12),
              ncol=3, frameon=False, fontsize=8.6)
    ax.set_title("Figure 6.  Mary Magdalene named across the four Gospels",
                 pad=12)
    save(fig, "fig6_canonical_appearances")


# =====================================================================
# FIGURE 7 — Women officeholders: evidence map (categorised)
# =====================================================================
def fig7_officeholders():
    fig, ax = plt.subplots(figsize=(12.5, 6.2))
    ax.set_xlim(0, 12.5); ax.set_ylim(0, 7.2); ax.axis("off")

    # category, colour, items [(name, detail, contested?)]
    groups = [
        ("Literary / NT", RECLAIM, [
            ("Junia", "'apostle' (Rom 16:7)", True),
            ("Phoebe", "diakonos & prostatis (Rom 16:1–2)", True),
            ("Prisca", "taught Apollos (Acts 18)", False),
            ("Thecla", "self-baptism; teaches (Acts of P&T)", True),
        ]),
        ("External witness", GREY, [
            ("Pliny's ministrae", "two women 'deacons', c.112 CE", False),
            ("Prisca & Maximilla", "Montanist prophets, c.165–170", True),
        ]),
        ("Epigraphic", CONTEST, [
            ("Ammion presbytera", "Phrygia, 3rd c.", True),
            ("Kale presbytera", "Sicily, 4–5th c.", True),
            ("Flavia Vitalia", "presbytera, Salona 425", True),
            ("Theodora EPISCOPA", "Rome mosaic, 9th c.", True),
        ]),
    ]
    gx = [2.1, 6.25, 10.4]
    for (gname, gcol, items), x in zip(groups, gx):
        head = FancyBboxPatch((x-1.9, 6.0), 3.8, 0.75,
                              boxstyle="round,pad=0.02,rounding_size=0.1",
                              linewidth=0, facecolor=gcol)
        ax.add_patch(head)
        ax.text(x, 6.37, gname, ha="center", va="center", color="white",
                fontsize=11, fontweight="bold")
        y = 5.4
        for name, detail, contested in items:
            h = 1.05
            box = FancyBboxPatch((x-1.9, y-h+0.12), 3.8, h-0.18,
                                 boxstyle="round,pad=0.03,rounding_size=0.08",
                                 linewidth=1.4, edgecolor=gcol, facecolor="white")
            ax.add_patch(box)
            ax.text(x, y-0.18, name, ha="center", va="center", fontsize=9.6,
                    fontweight="bold", color=gcol)
            ax.text(x, y-0.55, detail, ha="center", va="center", fontsize=8.0,
                    color=INK)
            if contested:
                ax.text(x+1.62, y-0.02, "†", ha="center", va="center",
                        fontsize=11, color=ERASE, fontweight="bold")
            y -= h + 0.12
    ax.text(0.5, 0.05,
            "† = the title/office is interpretively contested (e.g. office-holder vs. honorific, 'older woman', or a presbyter's wife).",
            transform=ax.transAxes, ha="left", fontsize=8.2, style="italic", color=ERASE)
    ax.set_title("Figure 7.  Women's authority in early Christianity: the contested evidence",
                 pad=10)
    save(fig, "fig7_officeholders_map")


if __name__ == "__main__":
    fig1_memory_timeline()
    fig2_conflation()
    fig3_junia()
    fig4_peter_mary()
    fig5_framework()
    fig6_canonical()
    fig7_officeholders()
    print("\nAll figures written to:", OUT)
