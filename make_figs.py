# -*- coding: utf-8 -*-
"""Generate four diagram figures for the clock-it narrative review, matching the
clean single-column published-article look of the reference format."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle
import os

OUT = "/home/user/Claude/figs"
os.makedirs(OUT, exist_ok=True)
plt.rcParams.update({"font.family": "DejaVu Serif", "font.size": 11})

INK = "#1a1a1a"; ACC = "#2f5d8a"; ACC2 = "#8a2f4f"; GREY = "#6b6b6b"
LIGHT = "#eef2f7"; LIGHT2 = "#f6eef1"; LIGHT3 = "#eef5ee"; GOLD = "#b8860b"

def box(ax, x, y, w, h, text, fc=LIGHT, ec=ACC, fs=11, bold=False, tc=INK):
    p = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.06",
                       linewidth=1.4, edgecolor=ec, facecolor=fc, mutation_aspect=1)
    ax.add_patch(p)
    ax.text(x + w/2, y + h/2, text, ha="center", va="center", fontsize=fs,
            color=tc, fontweight=("bold" if bold else "normal"), wrap=True)

def arrow(ax, x1, y1, x2, y2, color=GREY, style="-|>", lw=1.6, ls="-"):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style,
                 mutation_scale=16, lw=lw, color=color, linestyle=ls,
                 shrinkA=2, shrinkB=2))

# ---------------------------------------------------------------
# FIGURE 1 — Structured narrative-review & verification workflow
# ---------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10.4, 3.4)); ax.axis("off")
ax.set_xlim(0, 102); ax.set_ylim(0, 32)
stages = [
    ("SCOPE\n5 search angles", LIGHT, ACC),
    ("SEARCH\nparallel fan-out", LIGHT, ACC),
    ("FETCH\nsources + claims", LIGHT, ACC),
    ("VERIFY\nfull-text check", LIGHT2, ACC2),
    ("SYNTHESIZE\ncited review", LIGHT3, "#2f7d4f"),
]
x = 1; w = 16.5; gap = 4.0; y = 16; h = 9
cx = []
for i, (t, fc, ec) in enumerate(stages):
    box(ax, x, y, w, h, t, fc=fc, ec=ec, fs=11, bold=True)
    cx.append(x + w/2)
    if i: arrow(ax, x - gap + 0.4, y + h/2, x - 0.3, y + h/2, color=GREY, lw=2)
    x += w + gap
# angle callouts under SCOPE/SEARCH
angles = ["lexicography", "trans studies", "ballroom / AAVE", "sociolinguistics", "media studies"]
ax.text(cx[1], 12.5, "  ".join(f"• {a}" for a in angles[:3]), ha="center",
        va="top", fontsize=8.5, color=GREY)
ax.text(cx[1], 9.8, "  ".join(f"• {a}" for a in angles[3:]), ha="center",
        va="top", fontsize=8.5, color=GREY)
ax.text(cx[3], 12.5, "lemma check across\n7 full texts", ha="center", va="top",
        fontsize=8.5, color=ACC2, style="italic")
ax.text(50, 30.2, "Figure 1 workflow", ha="center", fontsize=1, color="white")
plt.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig1.png", dpi=200, bbox_inches="tight"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 2 — Semantic genealogy of "to clock"
# ---------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.6, 5.0)); ax.axis("off")
ax.set_xlim(0, 100); ax.set_ylim(0, 52)
# Root
box(ax, 36, 44, 28, 6.5, "NOUN clock  ( < L. clocca 'bell', c.1350)", fc="#f3f3f3", ec=INK, fs=10.5, bold=True)
# two noun derivations
box(ax, 8, 33, 28, 6.5, "noun 'face'\n(timepiece analogy, early C20)", fc="#f3f3f3", ec=GREY, fs=9.5)
box(ax, 64, 33, 28, 6.5, "verb 'register / record'\n(a time, a speed)", fc="#f3f3f3", ec=GREY, fs=9.5)
arrow(ax, 46, 44, 26, 39.5); arrow(ax, 54, 44, 74, 39.5)
# strike branch (separate)
box(ax, 8, 22, 28, 6.5, "VERB 'to strike / punch'\n(1941, orig. Australian)", fc=LIGHT2, ec=ACC2, fs=9.5)
arrow(ax, 22, 33, 22, 28.5, color=ACC2)
ax.text(22, 18.7, "separate branch\n(not the review's sense)", ha="center", va="top",
        fontsize=8, color=ACC2, style="italic")
# perception sense (core)
box(ax, 36, 22, 28, 7, "VERB 'to notice / see /\nrecognize'  (1929; 1942)", fc=LIGHT, ec=ACC, fs=10, bold=True)
arrow(ax, 50, 44, 50, 29.2, color=ACC, lw=2.2)
# specialization
box(ax, 36, 11, 28, 7, "SPECIALIZATION: 'clocked'\n= read as trans / not passing\n(ballroom & trans communities)", fc=LIGHT, ec=ACC, fs=9.2, bold=True)
arrow(ax, 50, 22, 50, 18.2, color=ACC, lw=2.2)
ax.text(65.5, 14.5, "narrowing", ha="left", va="center", fontsize=8.5, color=ACC, style="italic")
# re-generalization
box(ax, 36, 1, 28, 7, "RE-GENERALIZATION: 'clock it'\n= name a concealed truth\n(mainstream / Gen Z)", fc=LIGHT3, ec="#2f7d4f", fs=9.2, bold=True)
arrow(ax, 50, 11, 50, 8.2, color="#2f7d4f", lw=2.2)
ax.text(65.5, 4.5, "broadening", ha="left", va="center", fontsize=8.5, color="#2f7d4f", style="italic")
plt.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig2.png", dpi=200, bbox_inches="tight"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 3 — Transmission timeline
# ---------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9.6, 3.9)); ax.axis("off")
ax.set_xlim(0, 100); ax.set_ylim(0, 40)
ax.plot([4, 96], [20, 20], color=INK, lw=2, zorder=1)
events = [
    (8,  "1929", "perception sense\nattested (Partridge)", 1),
    (24, "1942", "'to look at; see'\n(Berrey & Van den Bark)", -1),
    (42, "1980s", "ballroom / trans\nspecialization", 1),
    (60, "2009", "RuPaul's Drag Race\nmediatization", -1),
    (76, "2010s", "social-media\ndiffusion", 1),
    (92, "2020s", "mainstream\n'clock it'", -1),
]
for x, yr, lab, d in events:
    ax.plot([x], [20], "o", color=ACC, ms=10, zorder=3)
    ax.plot([x, x], [20, 20 + d*4], color=GREY, lw=1.2, zorder=2)
    ax.text(x, 20 + d*5.2, yr, ha="center", va=("bottom" if d>0 else "top"),
            fontsize=10, fontweight="bold", color=ACC)
    ax.text(x, 20 + d*9.0, lab, ha="center", va=("bottom" if d>0 else "top"),
            fontsize=8.3, color=INK)
arrow(ax, 92, 20, 97.5, 20, color=INK, lw=2)
plt.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig3.png", dpi=200, bbox_inches="tight"); plt.close(fig)

# ---------------------------------------------------------------
# FIGURE 4 — Four scholarly lenses on "clock it"
# ---------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8.6, 5.4)); ax.axis("off")
ax.set_xlim(0, 100); ax.set_ylim(0, 62)
# central hub
hub = Circle((50, 31), 11, facecolor=GOLD, edgecolor=INK, lw=1.6, alpha=0.95, zorder=3)
ax.add_patch(hub)
ax.text(50, 31, "clock it", ha="center", va="center", fontsize=14,
        fontweight="bold", color="white", style="italic", zorder=4)
lenses = [
    (50, 54, "LEXICOGRAPHY\nOED; Green's; Partridge\n(dating the perception sense)", LIGHT, ACC),
    (16, 31, "TRANS STUDIES\nWong; Schiffer; Beauchamp\n(clocking vs. passing)", LIGHT2, ACC2),
    (84, 31, "SOCIOLINGUISTICS\nIlbury; Walcott; Crowley\n(enregisterment; appropriation)", LIGHT3, "#2f7d4f"),
    (50, 8, "MEDIA / PERFORMANCE\nGoldmark; Hodes & Sandoval;\nMcKinnon; Simmons", "#f3f3f3", GREY),
]
R = 11  # hub radius
for x, y, t, fc, ec in lenses:
    box(ax, x-17, y-6.5, 34, 13, t, fc=fc, ec=ec, fs=9, bold=False)
    if y > 40:        # top box -> hub top
        arrow(ax, 50, y-6.5, 50, 31+R, color=GREY, lw=1.3, style="-")
    elif y < 20:      # bottom box -> hub bottom
        arrow(ax, 50, y+6.5, 50, 31-R, color=GREY, lw=1.3, style="-")
    elif x < 50:      # left box -> hub left
        arrow(ax, x+17, 31, 50-R, 31, color=GREY, lw=1.3, style="-")
    else:             # right box -> hub right
        arrow(ax, x-17, 31, 50+R, 31, color=GREY, lw=1.3, style="-")
# redraw hub on top
hub2 = Circle((50, 31), 11, facecolor=GOLD, edgecolor=INK, lw=1.6, zorder=5)
ax.add_patch(hub2)
ax.text(50, 31, "clock it", ha="center", va="center", fontsize=14,
        fontweight="bold", color="white", style="italic", zorder=6)
plt.tight_layout(pad=0.3)
fig.savefig(f"{OUT}/fig4.png", dpi=200, bbox_inches="tight"); plt.close(fig)

print("Figures written to", OUT)
for f in ("fig1","fig2","fig3","fig4"):
    print(" ", f+".png", os.path.getsize(f"{OUT}/{f}.png"), "bytes")
