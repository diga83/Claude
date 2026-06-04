#!/usr/bin/env python3
"""Generate publication-quality figures for the agentic-AI-in-education review.
All numeric values are drawn from the verified sources cited in the manuscript."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.font_manager as fm

plt.rcParams.update({
    "font.family": "DejaVu Serif",
    "font.size": 11,
    "axes.titlesize": 13,
    "axes.titleweight": "bold",
    "figure.dpi": 300,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
})

NAVY = "#1f3a5f"
BLUE = "#2e6da4"
TEAL = "#2a9d8f"
AMBER = "#e9a13b"
RED = "#c0392b"
GREY = "#9aa0a6"
LIGHT = "#eef2f6"

# ---------------------------------------------------------------
# FIGURE 1 — Conceptual evolution: ITS -> Generative -> Agentic
# ---------------------------------------------------------------
def fig1():
    fig, ax = plt.subplots(figsize=(9.2, 4.3))
    ax.set_xlim(0, 10); ax.set_ylim(0, 6); ax.axis("off")
    stages = [
        (0.2, "Intelligent\nTutoring Systems", "Rule-based\nScripted branching\nDomain models", LIGHT, NAVY),
        (3.5, "Generative AI\n(Chatbots)", "Reactive\nContent on request\nSingle-turn", "#dfeaf2", BLUE),
        (6.8, "Agentic AI", "Autonomous · goal-directed\nPlanning · tool use\nMemory · multi-agent", "#d8efe9", TEAL),
    ]
    for x, title, body, fc, ec in stages:
        box = FancyBboxPatch((x, 1.4), 2.7, 3.1, boxstyle="round,pad=0.08,rounding_size=0.15",
                             linewidth=2, edgecolor=ec, facecolor=fc)
        ax.add_patch(box)
        ax.text(x + 1.35, 3.95, title, ha="center", va="center", fontsize=12, fontweight="bold", color=ec)
        ax.text(x + 1.35, 2.55, body, ha="center", va="center", fontsize=9.3, color="#333333")
    for x0 in (3.0, 6.3):
        ax.add_patch(FancyArrowPatch((x0, 2.95), (x0 + 0.5, 2.95), arrowstyle="-|>",
                                     mutation_scale=22, linewidth=2.2, color="#555555"))
    ax.text(5.0, 0.7, "Increasing autonomy and goal-directedness  →",
            ha="center", va="center", fontsize=10.5, style="italic", color="#555555")
    ax.annotate("", xy=(9.4, 0.95), xytext=(0.6, 0.95),
                arrowprops=dict(arrowstyle="-|>", color="#bbbbbb", lw=1.4))
    fig.savefig("fig1_evolution.png"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 2 — Forest plot of standardized effect sizes
# ---------------------------------------------------------------
def fig2():
    # (label, point, ci_low, ci_high, marker_note, color)
    rows = [
        ("Wang & Fan (2025) — RETRACTED\nmeta-analysis, performance", 0.867, None, None, "retracted", GREY),
        ("Kestin et al. (2025)\nHarvard physics RCT (range)", 1.015, 0.73, 1.30, "range", TEAL),
        ("Liu et al. (2025)\nmeta-analysis, 37 studies", 0.577, 0.395, 0.759, "ci", BLUE),
        ("Cheng et al. (2026)\nmeta-analysis, GenAI pedagogical agents", 0.401, None, None, "point", BLUE),
        ("World Bank / De Simone et al. (2025)\nNigeria RCT (composite, SD)", 0.31, None, None, "point", AMBER),
    ]
    fig, ax = plt.subplots(figsize=(9.2, 4.6))
    ys = list(range(len(rows)))[::-1]
    for y, (label, pt, lo, hi, note, color) in zip(ys, rows):
        if lo is not None:
            ax.plot([lo, hi], [y, y], color=color, lw=2.4, zorder=2,
                    solid_capstyle="round")
            ax.plot([lo, lo], [y-0.08, y+0.08], color=color, lw=2.0)
            ax.plot([hi, hi], [y-0.08, y+0.08], color=color, lw=2.0)
        marker = "s" if note == "retracted" else "o"
        ax.scatter([pt], [y], s=150 if note!="retracted" else 130, color=color,
                   edgecolor="white", linewidth=1.2, zorder=3, marker=marker)
        if note == "retracted":
            ax.text(pt, y-0.30, f"{pt:.2f}  (retracted; excluded)", ha="center", va="top",
                    fontsize=8.6, color=GREY)
        elif note == "range":
            ax.text(pt, y+0.22, "0.73–1.30  (reported range)", ha="center", va="bottom",
                    fontsize=8.6, color=color)
        else:
            ax.text(pt, y+0.22, f"{pt:.2f}", ha="center", va="bottom", fontsize=8.6, color=color)
    ax.axvline(0, color="#cccccc", lw=1)
    ax.axvspan(0.2, 0.5, color="#f4f4f4", zorder=0)
    for x, lbl in [(0.2,"small"),(0.5,"medium"),(0.8,"large")]:
        ax.text(x, len(rows)-0.55, lbl, fontsize=8, color="#999999", ha="center", style="italic")
    ax.set_yticks(ys); ax.set_yticklabels([r[0] for r in rows], fontsize=9)
    ax.set_ylim(-0.7, len(rows)-0.25)
    ax.set_xlim(-0.05, 1.45); ax.set_xlabel("Standardized effect size (Cohen's d / Hedges' g / SD)")
    ax.spines[["top","right"]].set_visible(False)
    fig.savefig("fig2_forest.png"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 3 — The dissociation (Bastani et al. 2025)
# ---------------------------------------------------------------
def fig3():
    fig, ax = plt.subplots(figsize=(8.4, 4.4))
    groups = ["Control\n(no AI)", "GPT Tutor\n(guardrailed)", "GPT Base\n(unguarded)"]
    vals = [100, 100, 83]
    colors = ["#7f8c8d", TEAL, RED]
    bars = ax.bar(groups, vals, color=colors, width=0.62, edgecolor="white", linewidth=1.5, zorder=3)
    ax.axhline(100, color="#999999", lw=1, ls="--", zorder=1)
    ax.text(2.55, 100.4, "control baseline", fontsize=8.5, color="#888888", ha="right", style="italic")
    labels = ["= baseline", "≈ no harm", "−17% lower"]
    for b, v, lab in zip(bars, vals, labels):
        ax.text(b.get_x()+b.get_width()/2, v+0.6, lab, ha="center", va="bottom",
                fontsize=10, fontweight="bold", color=b.get_facecolor())
    # bracket annotation
    ax.annotate("", xy=(2, 83), xytext=(2, 100),
                arrowprops=dict(arrowstyle="<->", color=RED, lw=1.6))
    ax.text(1.62, 91.5, "performance\ndrop once AI\nremoved", fontsize=8.6, color=RED, ha="right", va="center")
    ax.set_ylim(70, 106)
    ax.set_ylabel("Exam performance after AI access removed\n(control = 100, indexed)")
    ax.spines[["top","right"]].set_visible(False)
    fig.subplots_adjust(bottom=0.16)
    fig.savefig("fig3_dissociation.png"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 4 — Governance timeline
# ---------------------------------------------------------------
def fig4():
    fig, ax = plt.subplots(figsize=(9.4, 3.7))
    ax.set_xlim(2022.55, 2026.05); ax.set_ylim(-2.1, 2.1); ax.axis("off")
    ax.annotate("", xy=(2025.98, 0), xytext=(2022.7, 0),
                arrowprops=dict(arrowstyle="-|>", color="#444444", lw=2))
    # (x_marker, stem_len, text_y, label, color)
    events = [
        (2023.5,  0.5,  1.15, "UNESCO (2023)\nGuidance for GenAI in\neducation & research", BLUE),
        (2024.1, -0.5, -1.15, "EU AI Act (2024) adopted\neducation AI high-risk\n(Annex III)", NAVY),
        (2024.75, 0.5,  1.15, "UNESCO (2024)\nAI competency frameworks\n(students & teachers)", TEAL),
        (2025.12,-0.5, -1.15, "EU AI Act (Feb 2025)\nemotion-inference ban +\nAI-literacy duty in force", RED),
    ]
    for x, stem, ty, label, color in events:
        ax.plot([x], [0], "o", ms=11, color=color, zorder=3, markeredgecolor="white", markeredgewidth=1.5)
        ax.plot([x, x], [0, stem], color=color, lw=1.4)
        ax.text(x, ty, label, ha="center", va="center", fontsize=8.4, color="#222222",
                bbox=dict(boxstyle="round,pad=0.3", fc="white", ec=color, lw=1.3))
    for yr in (2023, 2024, 2025):
        ax.text(yr, -1.92, str(yr), ha="center", fontsize=9.5, fontweight="bold", color="#666666")
        ax.plot([yr, yr],[ -0.08,0.08], color="#888888", lw=1)
    fig.savefig("fig4_timeline.png"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 5 — Review & verification methodology flow
# ---------------------------------------------------------------
def fig5():
    fig, ax = plt.subplots(figsize=(9.2, 4.0))
    ax.set_xlim(0, 12); ax.set_ylim(0, 5); ax.axis("off")
    steps = [
        (0.3, "Scope\n\n5 thematic\nsearch angles", "#dfeaf2", BLUE),
        (3.0, "Search & screen\n\n~40 sources\nretained\n(2023–2026)", "#d8efe9", TEAL),
        (5.9, "Adversarial\nverification\n\n12 load-bearing\nclaims × 3 votes", "#fdeccd", AMBER),
        (8.8, "Outcome\n\n11 confirmed\n1 rejected\n(misattributed stat)", "#f6d9d4", RED),
    ]
    for x, label, fc, ec in steps:
        box = FancyBboxPatch((x, 1.3), 2.4, 2.6, boxstyle="round,pad=0.08,rounding_size=0.12",
                             linewidth=1.8, edgecolor=ec, facecolor=fc)
        ax.add_patch(box)
        ax.text(x+1.2, 2.6, label, ha="center", va="center", fontsize=9.2, color="#222222")
    for x0 in (2.75, 5.65, 8.55):
        ax.add_patch(FancyArrowPatch((x0, 2.6), (x0+0.3, 2.6), arrowstyle="-|>",
                                     mutation_scale=20, lw=2, color="#555555"))
    ax.add_patch(FancyBboxPatch((3.0, 0.15), 8.2, 0.8, boxstyle="round,pad=0.06,rounding_size=0.1",
                                linewidth=1.4, edgecolor=NAVY, facecolor="#eef2f6"))
    ax.text(7.1, 0.55, "Synthesis → 36 bibliographically re-verified references",
            ha="center", va="center", fontsize=9.4, fontweight="bold", color=NAVY)
    fig.savefig("fig5_method.png"); plt.close(fig)

for f in (fig1, fig2, fig3, fig4, fig5):
    f()
    print("ok:", f.__name__)
print("All figures written.")
