#!/usr/bin/env python3
"""Generate figures for the journal-style 6-7 narrative review."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle

plt.rcParams.update({
    "font.family": "serif",
    "font.serif": ["DejaVu Serif"],
    "font.size": 9,
    "savefig.dpi": 220,
    "savefig.bbox": "tight",
})
OUT = "/home/user/Claude/figs"
os.makedirs(OUT, exist_ok=True)

INK = "#1a1a1a"
BOX = "#eef2f7"
EDGE = "#3b5b80"
ACCENT = "#b5651d"

# ---------- Figure 1: workflow ----------------------------------------------
fig, ax = plt.subplots(figsize=(7.2, 2.2))
ax.axis("off")
stages = [
    "Scope\n5 angles",
    "Search\n5 agents",
    "Extract\nclaims",
    "Adversarial\nverification",
    "Synthesis\ncited review",
]
n = len(stages)
w, h = 1.62, 1.0
gap = (10 - n * w) / (n - 1)
y = 0.5
for i, s in enumerate(stages):
    x = i * (w + gap)
    box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08",
                         linewidth=1.2, edgecolor=EDGE,
                         facecolor=(ACCENT if i == 3 else BOX))
    ax.add_patch(box)
    ax.text(x + w / 2, y + h / 2, s, ha="center", va="center", fontsize=8.5,
            color=("white" if i == 3 else INK))
    if i < n - 1:
        ax.add_patch(FancyArrowPatch((x + w, y + h / 2), (x + w + gap, y + h / 2),
                     arrowstyle="-|>", mutation_scale=12, linewidth=1.2, color=EDGE))
ax.set_xlim(-0.15, 10.15); ax.set_ylim(0.2, 1.8)
fig.savefig(f"{OUT}/fig1_workflow.png"); plt.close(fig)

# ---------- Figure 2: timeline ----------------------------------------------
fig, ax = plt.subplots(figsize=(6.6, 2.7))
ax.axis("off")
events = [
    ("Dec 2024", "“Doot Doot (6 7)”\nleaks online", 1),
    ("Feb 2025", "Official release\n(Priority Records)", -1),
    ("Mar 2025", "“67 Kid” AAU\nvideo posted", 1),
    ("Summer 2025", "Basketball edits\ngo viral (LaMelo)", -1),
    ("Oct 2025", "Dictionary.com\nWord of the Year", 1),
    ("Nov 2025", "School bans;\nStarmer incident", -1),
]
xs = list(range(len(events)))
ax.plot([min(xs) - 0.3, max(xs) + 0.3], [0, 0], color=EDGE, linewidth=2, zorder=1)
for x, (date, label, side) in zip(xs, events):
    ax.scatter([x], [0], s=70, color=ACCENT, zorder=3, edgecolor="white", linewidth=1)
    ax.text(x, 0.12 * side + (0.02 if side > 0 else -0.02), "", ha="center")
    ax.annotate(label, xy=(x, 0), xytext=(x, 0.45 * side),
                ha="center", va="center", fontsize=7.5,
                arrowprops=dict(arrowstyle="-", color="#888", linewidth=0.8))
    ax.text(x, -0.18 if side > 0 else 0.18, date, ha="center",
            va="top" if side > 0 else "bottom", fontsize=7.5,
            fontweight="bold", color=EDGE)
ax.set_xlim(min(xs) - 0.6, max(xs) + 0.6); ax.set_ylim(-0.75, 0.75)
fig.savefig(f"{OUT}/fig2_timeline.png"); plt.close(fig)

# ---------- Figure 3: meaning cline -----------------------------------------
fig, ax = plt.subplots(figsize=(6.6, 2.3))
ax.axis("off")
ax.add_patch(FancyArrowPatch((0.3, 1.0), (9.7, 1.0), arrowstyle="-|>",
             mutation_scale=16, linewidth=2.0, color=EDGE))
ax.text(0.3, 1.35, "Referential / truth-conditional", ha="left", fontsize=8.5,
        fontweight="bold", color=INK)
ax.text(9.7, 1.35, "Phatic / expressive / indexical", ha="right", fontsize=8.5,
        fontweight="bold", color=INK)
items = [
    (0.8, "proper names,\npredicates"),
    (3.1, "content words\nwith bleaching"),
    (5.3, "discourse markers,\nexpletives"),
    (7.3, "greetings,\ninterjections"),
    (9.3, "“6-7”"),
]
for x, lbl in items:
    emph = lbl.strip().startswith("“6-7")
    ax.scatter([x], [1.0], s=(90 if emph else 45),
               color=(ACCENT if emph else "#5a7aa0"), zorder=3,
               edgecolor="white", linewidth=1)
    ax.text(x, 0.55, lbl, ha="center", va="top", fontsize=7.5,
            fontweight=("bold" if emph else "normal"),
            color=(ACCENT if emph else INK))
ax.set_xlim(0, 10); ax.set_ylim(0, 1.7)
fig.savefig(f"{OUT}/fig3_cline.png"); plt.close(fig)

# ---------- Figure 4: disciplinary convergence ------------------------------
fig, ax = plt.subplots(figsize=(6.6, 4.2))
ax.axis("off")
cx, cy, R = 0.5, 0.5, 0.34
hub = Circle((cx, cy), 0.135, facecolor=ACCENT, edgecolor=EDGE, linewidth=1.4, zorder=3)
ax.add_patch(hub)
ax.text(cx, cy, "Phatic-only\nlanguage", ha="center", va="center",
        color="white", fontsize=8.5, fontweight="bold", zorder=4)
nodes = [
    ("Anthropology\nMalinowski (1923)", 90),
    ("Structural linguistics\nJakobson (1960)", 35),
    ("Philosophy of language\nWittgenstein; Kaplan; Potts", -20),
    ("Sociolinguistics\nSilverstein; Eckert; Eble", -90),
    ("Internet linguistics\nDawkins; McCulloch", -160),
    ("Media studies\nMiller (2008)", 150),
]
import math
for lbl, ang in nodes:
    a = math.radians(ang)
    x = cx + R * math.cos(a); y = cy + R * 0.78 * math.sin(a)
    ax.add_patch(FancyArrowPatch((cx, cy), (x, y), arrowstyle="-",
                 linewidth=1.0, color="#9aacc2", zorder=1,
                 shrinkA=16, shrinkB=22))
    ax.text(x, y, lbl, ha="center", va="center", fontsize=7.6,
            bbox=dict(boxstyle="round,pad=0.3", facecolor=BOX, edgecolor=EDGE, linewidth=1))
ax.set_xlim(0, 1); ax.set_ylim(0.05, 0.95)
fig.savefig(f"{OUT}/fig4_convergence.png"); plt.close(fig)

print("figures written to", OUT)
for f in sorted(os.listdir(OUT)):
    print(" ", f)
