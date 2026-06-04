#!/usr/bin/env python3
"""Generate publication-quality figures for the narrative review.
Grayscale-legible, 300 DPI, vector PDF + PNG."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle
from matplotlib.lines import Line2D

plt.rcParams.update({
    "font.family": "serif",
    "font.serif": ["DejaVu Serif", "Times New Roman"],
    "font.size": 10,
    "axes.linewidth": 0.8,
    "savefig.dpi": 300,
    "pdf.fonttype": 42,
})

OUT = "/home/user/Claude/figures"
import os
os.makedirs(OUT, exist_ok=True)

INK = "#1a1a1a"
GREY = "#6b6b6b"
LGREY = "#d9d9d9"

def save(fig, name):
    fig.savefig(f"{OUT}/{name}.png", bbox_inches="tight", facecolor="white")
    fig.savefig(f"{OUT}/{name}.pdf", bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("saved", name)

# =====================================================================
# FIGURE 1 — The Stance-Structure Continuum (2x2 framework)
# =====================================================================
def figure1():
    fig, ax = plt.subplots(figsize=(8.4, 7.0))
    ax.set_xlim(0, 10); ax.set_ylim(0, 10); ax.axis("off")

    # quadrant background fills (subtle, grayscale)
    fills = {
        (0,0):"#f2f2f2", (5,0):"#e3ebe3",  # bottom-left, bottom-right (right=desirable greenish-grey)
        (0,5):"#f2f2f2", (5,5):"#e3ebe3",
    }
    for (x,y),c in fills.items():
        ax.add_patch(Rectangle((x+0.6, y+0.6), 4.4, 4.4, facecolor=c, edgecolor="none", zorder=0))

    # axes lines
    ax.add_patch(FancyArrowPatch((0.6,0.6),(10,0.6), arrowstyle="-|>",
                 mutation_scale=16, color=INK, lw=1.4, zorder=3))
    ax.add_patch(FancyArrowPatch((0.6,0.6),(0.6,10), arrowstyle="-|>",
                 mutation_scale=16, color=INK, lw=1.4, zorder=3))

    # axis labels
    ax.text(5.3, 0.05, "INSTRUCTIONAL STRUCTURE",
            ha="center", va="center", fontsize=11, fontweight="bold", color=INK)
    ax.text(1.95, 0.30, "low: text-generative locus,\nno scaffolding, no documentation",
            ha="center", va="center", fontsize=7.6, color=GREY, style="italic")
    ax.text(8.0, 0.30, "high: ideation locus, evaluative\nscaffolding, visible documentation",
            ha="center", va="center", fontsize=7.6, color=GREY, style="italic")

    ax.text(0.08, 5.3, "THEORETICAL STANCE", rotation=90,
            ha="center", va="center", fontsize=11, fontweight="bold", color=INK)
    ax.text(0.40, 2.6, "instrumental–\nmediational\n(AI as tool)", rotation=90,
            ha="center", va="center", fontsize=7.6, color=GREY, style="italic")
    ax.text(0.40, 7.7, "relational–\ndistributed\n(AI as co-actant)", rotation=90,
            ha="center", va="center", fontsize=7.6, color=GREY, style="italic")

    # quadrant content: (cx, cy, title, body, tag)
    quads = [
        (2.8, 2.8, "Substitution",
         "AI delegated text/draft production;\nminimal student judgement.",
         "Risk: ownership erosion,\n“metacognitive laziness”\n(Fan et al., 2025)"),
        (7.8, 2.8, "Scaffolded tool use",
         "AI at ideation/revision; evaluative\nscaffolding; prompt logs, “tech-off”\nreflection.",
         "Builds voice + feedback literacy\n(Process Pedagogy 2.0, Elturki 2026;\nPAIRR, Sperber et al. 2025)"),
        (2.8, 7.6, "Uncritical entanglement",
         "Distributed authorship accepted\nwithout reflection.",
         "Risk: diffuse agency,\ncognitive surrogacy"),
        (7.8, 7.6, "Critical co-authorship",
         "Distributed stance made an\nobject of reflection.",
         "Builds critical AI / postdigital\nliteracy (Burriss & Leander 2024;\nJeon & Lee 2026)"),
    ]
    for cx, cy, title, body, tag in quads:
        ax.text(cx, cy+1.15, title, ha="center", va="center",
                fontsize=11, fontweight="bold", color=INK)
        ax.text(cx, cy+0.25, body, ha="center", va="center",
                fontsize=8.1, color="#333333")
        ax.text(cx, cy-0.95, tag, ha="center", va="center",
                fontsize=7.2, color=GREY, style="italic")

    # divider lines
    ax.plot([5.3,5.3],[0.6,10.0], color=GREY, lw=0.7, ls=(0,(4,3)), zorder=2)
    ax.plot([0.6,10.0],[5.3,5.3], color=GREY, lw=0.7, ls=(0,(4,3)), zorder=2)

    # outcome arrow along bottom-right desirability
    ax.add_patch(FancyArrowPatch((5.5,9.45),(9.9,9.45), arrowstyle="-|>",
                 mutation_scale=14, color="#2f6b2f", lw=1.6, zorder=4))
    ax.text(7.7, 9.75, "Outcome layer →  feedback literacy · authorial agency · knowledge transfer",
            ha="center", va="center", fontsize=7.8, color="#2f6b2f", fontweight="bold")

    fig.suptitle("Figure 1. The Stance–Structure Continuum for AI-aware writing instruction",
                 y=0.025, fontsize=10.5, fontweight="bold")
    save(fig, "figure1_stance_structure")

# =====================================================================
# FIGURE 2 — Review landscape and the pedagogical lacuna
# =====================================================================
def figure2():
    fig, ax = plt.subplots(figsize=(8.4, 5.6))
    ax.set_xlim(0,10); ax.set_ylim(0,8); ax.axis("off")

    # four existing-review buckets (top band)
    buckets = [
        (1.3, "Student use", "perceptions,\nbenefits/risks\n(Sanz-Tejeda\net al. 2026)"),
        (3.7, "Academic\nintegrity", "plagiarism,\ndetection, policy\n(Bittle &\nEl-Gayar 2025)"),
        (6.1, "Feedback\neffects / AWE", "effect sizes,\ntool function\n(Zhai & Ma 2023;\nCrosthwaite &\nSun 2026)"),
        (8.5, "General HE\nadoption", "attitudes,\nutilisation\n(reviews of\nHE practice)"),
    ]
    for cx, title, body in buckets:
        ax.add_patch(FancyBboxPatch((cx-1.05, 5.5), 2.1, 2.0,
            boxstyle="round,pad=0.02,rounding_size=0.12",
            facecolor="#ededed", edgecolor=INK, lw=0.9))
        ax.text(cx, 7.05, title, ha="center", va="center", fontsize=9, fontweight="bold")
        ax.text(cx, 6.15, body, ha="center", va="center", fontsize=6.9, color=GREY)
    ax.text(5.0, 7.85, "What existing reviews consolidate",
            ha="center", fontsize=9.5, fontweight="bold", color=INK)

    # the lacuna box (bottom)
    ax.add_patch(FancyBboxPatch((0.6, 0.5), 8.8, 3.4,
        boxstyle="round,pad=0.02,rounding_size=0.15",
        facecolor="#e3ebe3", edgecolor="#2f6b2f", lw=1.4))
    ax.text(5.0, 3.5, "The pedagogical lacuna: teaching-and-theory synthesis (this review)",
            ha="center", fontsize=9.5, fontweight="bold", color="#1f4d1f")
    openings = [
        (2.3, "Opening 1", "AI feedback through a\nfeedback-literacy lens\n(not effect sizes)"),
        (5.0, "Opening 2", "Authorial voice & agency\nas pedagogical aims\n(not integrity policing)"),
        (7.7, "Opening 3", "An integrative theory of\nAI-aware instruction\n(not fragmentation)"),
    ]
    for cx, t, b in openings:
        ax.add_patch(FancyBboxPatch((cx-1.15, 1.0), 2.3, 1.95,
            boxstyle="round,pad=0.02,rounding_size=0.1",
            facecolor="white", edgecolor="#2f6b2f", lw=0.9))
        ax.text(cx, 2.55, t, ha="center", fontsize=8.4, fontweight="bold", color="#1f4d1f")
        ax.text(cx, 1.7, b, ha="center", fontsize=7.0, color="#333333")

    # downward arrows from band to lacuna
    for cx in [2.3,5.0,7.7]:
        ax.add_patch(FancyArrowPatch((cx,5.45),(cx,3.95), arrowstyle="-|>",
                     mutation_scale=12, color=GREY, lw=1.0, ls=(0,(3,2))))

    fig.suptitle("Figure 2. The review landscape and the pedagogical lacuna",
                 y=0.02, fontsize=10.5, fontweight="bold")
    save(fig, "figure2_gap_map")

# =====================================================================
# FIGURE 3 — Three strands -> one organizing principle
# =====================================================================
def figure3():
    fig, ax = plt.subplots(figsize=(8.4, 5.2))
    ax.set_xlim(0,10); ax.set_ylim(0,7.5); ax.axis("off")

    strands = [
        (6.2, "Feedback as pedagogy",
         "superficial uptake →\nproductive engagement\nwhen judgement is required"),
        (3.9, "Authorial voice & agency",
         "ownership erodes at\ntext-generative loci;\npreserved at ideation loci"),
        (1.6, "Process pedagogy",
         "offloading → laziness\nunless restructured into\na scaffolded cycle"),
    ]
    for cy, title, body in strands:
        ax.add_patch(FancyBboxPatch((0.5, cy-0.85), 3.7, 1.7,
            boxstyle="round,pad=0.02,rounding_size=0.12",
            facecolor="#ededed", edgecolor=INK, lw=0.9))
        ax.text(2.35, cy+0.45, title, ha="center", fontsize=8.8, fontweight="bold")
        ax.text(2.35, cy-0.25, body, ha="center", fontsize=6.9, color=GREY)
        ax.add_patch(FancyArrowPatch((4.25,cy),(5.35,3.9), arrowstyle="-|>",
                     mutation_scale=13, color=GREY, lw=1.1))

    # central principle
    ax.add_patch(FancyBboxPatch((5.4, 2.7), 4.1, 2.4,
        boxstyle="round,pad=0.02,rounding_size=0.15",
        facecolor="#e3ebe3", edgecolor="#2f6b2f", lw=1.4))
    ax.text(7.45, 4.55, "Organising principle", ha="center", fontsize=9,
            fontweight="bold", color="#1f4d1f")
    ax.text(7.45, 3.55,
            "The locus and structure of\nAI intervention — not its presence\nor quantity — determine whether\ninstruction builds or erodes\nwriterly capacity.",
            ha="center", va="center", fontsize=8.0, color="#222222")

    # arrow down to framework
    ax.add_patch(FancyArrowPatch((7.45,2.65),(7.45,1.55), arrowstyle="-|>",
                 mutation_scale=14, color="#2f6b2f", lw=1.4))
    ax.add_patch(FancyBboxPatch((5.4, 0.35), 4.1, 1.15,
        boxstyle="round,pad=0.02,rounding_size=0.12",
        facecolor="#1f4d1f", edgecolor="#1f4d1f"))
    ax.text(7.45, 0.92, "Stance–Structure framework\n(Figure 1)",
            ha="center", va="center", fontsize=8.6, fontweight="bold", color="white")

    fig.suptitle("Figure 3. From three strands to one organising principle",
                 y=0.02, fontsize=10.5, fontweight="bold")
    save(fig, "figure3_synthesis")

figure1(); figure2(); figure3()
print("ALL FIGURES DONE")
