/* ═══════════════════════════════════════════════════════════════════════════
   International GCSE Computer Science 4CP0 — STREAKS & DAILY GOALS
   Tracks daily study activity, computes streaks, awards badges
   ═══════════════════════════════════════════════════════════════════════════ */

const STREAKS_KEY = 'gcse_cs_streaks_v1';

const DEFAULT_GOALS = {
  questions: 20,    // MCQs per day
  flashcards: 15,   // Cards reviewed per day
  reading: 1        // Chapter sections read per day
};

const BADGES = [
  { id: 'first_steps', name: 'First Steps', icon: '👣', desc: 'Complete your first study session', condition: s => s.totalDays >= 1 },
  { id: 'three_day', name: '3-Day Streak', icon: '🔥', desc: 'Study 3 days in a row', condition: s => s.currentStreak >= 3 },
  { id: 'week_warrior', name: 'Week Warrior', icon: '⚔️', desc: 'Maintain a 7-day streak', condition: s => s.currentStreak >= 7 },
  { id: 'fortnight', name: 'Fortnight Hero', icon: '🛡️', desc: 'Maintain a 14-day streak', condition: s => s.currentStreak >= 14 },
  { id: 'month_master', name: 'Month Master', icon: '👑', desc: 'Maintain a 30-day streak', condition: s => s.currentStreak >= 30 },
  { id: 'century', name: 'Century Club', icon: '💯', desc: 'Answer 100 MCQs total', condition: s => s.totalQuestions >= 100 },
  { id: 'mcq_500', name: 'MCQ Champion', icon: '🏆', desc: 'Answer 500 MCQs total', condition: s => s.totalQuestions >= 500 },
  { id: 'flash_50', name: 'Flash Learner', icon: '⚡', desc: 'Review 50 flashcards total', condition: s => s.totalFlashcards >= 50 },
  { id: 'flash_200', name: 'Memory Master', icon: '🧠', desc: 'Review 200 flashcards total', condition: s => s.totalFlashcards >= 200 },
  { id: 'reader', name: 'Bookworm', icon: '📚', desc: 'Read 5 chapters', condition: s => (s.readChapters || 0) >= 5 },
  { id: 'all_chapters', name: 'Completionist', icon: '🌟', desc: 'Read all 10 chapters', condition: s => (s.readChapters || 0) >= 10 },
  { id: 'goal_setter', name: 'Goal Setter', icon: '🎯', desc: 'Hit daily goal for 5 days', condition: s => (s.goalsHit || 0) >= 5 },
  { id: 'goal_machine', name: 'Goal Machine', icon: '🚀', desc: 'Hit daily goal for 15 days', condition: s => (s.goalsHit || 0) >= 15 }
];

function getStreaksData() {
  let data;
  try {
    const saved = JSON.parse(localStorage.getItem(STREAKS_KEY) || '{}');
    data = {
      activityByDay: saved.activityByDay || {},
      goals: saved.goals || DEFAULT_GOALS,
      totalQuestions: saved.totalQuestions || 0,
      totalFlashcards: saved.totalFlashcards || 0,
      totalDays: saved.totalDays || 0,
      currentStreak: saved.currentStreak || 0,
      longestStreak: saved.longestStreak || 0,
      lastDate: saved.lastDate || null,
      earnedBadges: saved.earnedBadges || [],
      goalsHit: saved.goalsHit || 0,
      readChapters: saved.readChapters || 0,
      lastGoalHitDate: saved.lastGoalHitDate || null
    };
  } catch(e) {
    data = { activityByDay: {}, goals: DEFAULT_GOALS, totalQuestions: 0, totalFlashcards: 0,
             totalDays: 0, currentStreak: 0, longestStreak: 0, lastDate: null,
             earnedBadges: [], goalsHit: 0, readChapters: 0, lastGoalHitDate: null };
  }
  // Always recompute readChapters from main app state — this isn't a streak-tracked
  // counter, it's a snapshot. Without this, "Bookworm" / "Completionist" badges
  // never unlock just from reading chapters.
  try {
    const mainState = JSON.parse(localStorage.getItem('gcse_cs_progress_v2') || '{}');
    data.readChapters = (mainState.readChapters || []).length;
  } catch(e) {}
  return data;
}

// Re-evaluate all badge conditions against current data and persist any newly earned.
// Returns the (possibly mutated) data so callers don't have to re-load.
function evaluateBadges(data) {
  if (!data) data = getStreaksData();
  const newlyEarned = [];
  BADGES.forEach(b => {
    if (!data.earnedBadges.includes(b.id) && b.condition(data)) {
      data.earnedBadges.push(b.id);
      newlyEarned.push(b);
    }
  });
  if (newlyEarned.length > 0) {
    saveStreaksData(data);
    // Toast notifications if available
    if (window.showBadgeToast) {
      newlyEarned.forEach(b => window.showBadgeToast(b));
    }
  }
  return data;
}

function saveStreaksData(data) {
  try { localStorage.setItem(STREAKS_KEY, JSON.stringify(data)); } catch(e) {}
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Called by activity-emitting pages
window.recordActivity = function(type) {
  const data = getStreaksData();
  const today = todayKey();

  if (!data.activityByDay[today]) {
    data.activityByDay[today] = { questions: 0, flashcards: 0, drills: 0, mindmaps: 0, reading: 0, essays: 0 };
  }

  // Map activity types
  const typeMap = {
    mcq_correct: 'questions',
    mcq_wrong: 'questions',
    mcq: 'questions',
    flashcard: 'flashcards',
    drill: 'drills',
    mindmap: 'mindmaps',
    reading: 'reading',
    essay: 'essays'
  };
  const key = typeMap[type] || type;
  data.activityByDay[today][key] = (data.activityByDay[today][key] || 0) + 1;

  // Update totals
  if (key === 'questions') data.totalQuestions++;
  if (key === 'flashcards') data.totalFlashcards++;

  // Update streak — happens once per day per activity type
  if (data.lastDate !== today) {
    if (data.lastDate === yesterdayKey()) {
      data.currentStreak++;
    } else if (data.lastDate !== today) {
      data.currentStreak = 1;
    }
    if (data.currentStreak > data.longestStreak) data.longestStreak = data.currentStreak;
    data.totalDays++;
    data.lastDate = today;
  }

  // Check if today's goal hit (questions + flashcards combined)
  const todayActivity = data.activityByDay[today];
  const todayPoints = (todayActivity.questions || 0) + (todayActivity.flashcards || 0);
  const goalTarget = data.goals.questions + data.goals.flashcards;
  const wasGoalHitToday = data.lastGoalHitDate === today;
  if (todayPoints >= goalTarget && !wasGoalHitToday) {
    data.goalsHit++;
    data.lastGoalHitDate = today;
  }

  // Track chapters read separately (from state.readChapters in main app)
  try {
    const mainState = JSON.parse(localStorage.getItem('gcse_cs_progress_v2') || '{}');
    data.readChapters = (mainState.readChapters || []).length;
  } catch(e) {}

  // Check for new badges
  const newlyEarned = [];
  BADGES.forEach(b => {
    if (!data.earnedBadges.includes(b.id) && b.condition(data)) {
      data.earnedBadges.push(b.id);
      newlyEarned.push(b);
    }
  });

  saveStreaksData(data);

  // Show notification for new badges
  if (newlyEarned.length > 0 && window.showBadgeToast) {
    newlyEarned.forEach(b => window.showBadgeToast(b));
  }
};

// Toast notification for new badges
window.showBadgeToast = function(badge) {
  let toast = document.getElementById('badgeToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'badgeToast';
    document.body.appendChild(toast);
    const style = document.createElement('style');
    style.textContent = `
      #badgeToast {
        position: fixed;
        bottom: 5rem;
        left: 50%;
        transform: translateX(-50%) translateY(120%);
        background: linear-gradient(135deg, #B45309, #DC2626);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 14px;
        box-shadow: 0 12px 40px rgba(220,38,38,0.4);
        z-index: 200;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 360px;
      }
      #badgeToast.show { transform: translateX(-50%) translateY(0); }
      #badgeToast .icon { font-size: 2.5rem; }
      #badgeToast .info { line-height: 1.3; }
      #badgeToast .title { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
      #badgeToast .sub { font-size: 0.85rem; opacity: 0.9; margin-top: 0.15rem; }
    `;
    document.head.appendChild(style);
  }
  toast.innerHTML = `
    <span class="icon">${badge.icon}</span>
    <div class="info">
      <div class="title">Badge unlocked: ${badge.name}!</div>
      <div class="sub">${badge.desc}</div>
    </div>
  `;
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 4500);
};

// Compact streak widget shown at top of pages (optional)
function injectStreakBadge() {
  // Recalculate to ensure correct value if user has been away
  const data = getStreaksData();
  // Check if streak should be broken (no activity since yesterday)
  if (data.lastDate && data.lastDate !== todayKey() && data.lastDate !== yesterdayKey()) {
    data.currentStreak = 0;
    saveStreaksData(data);
  }
  // Re-evaluate badges every page load. This catches the case where the user
  // earned a badge through activity that didn't trigger recordActivity
  // (e.g. marking chapters as read, which is tracked in the main app state).
  evaluateBadges(data);
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  injectStreakBadge();
});
