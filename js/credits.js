/* Somnia — plans & credits.
   Demo billing: plan/credit state lives in localStorage and "checkout" is
   simulated. The structure mirrors a real Stripe integration — swap
   purchasePack/changePlan internals for Checkout sessions + webhooks and
   move balance enforcement server-side. */
(function () {
  'use strict';

  const KEY = 'somnia-account-v1';

  const PLANS = {
    free: {
      id: 'free', name: 'Dreamer', monthly: 0, yearly: 0, allowance: 5,
      tagline: 'For the curious',
      features: [
        '5 AI dream readings / month',
        'Unlimited instant (on-device) readings',
        'Full 77-symbol dream dictionary',
        'Private dream journal with stats',
        'All guides & the dream quiz'
      ]
    },
    lucid: {
      id: 'lucid', name: 'Lucid', monthly: 4.99, yearly: 39.99, allowance: 100,
      tagline: 'For nightly dreamers', popular: true,
      features: [
        '100 AI dream readings / month',
        'All 5 interpretive lenses',
        'Reading history saved to your journal',
        'Everything in Dreamer',
        'Priority processing'
      ]
    },
    oneironaut: {
      id: 'oneironaut', name: 'Oneironaut', monthly: 9.99, yearly: 79.99, allowance: Infinity,
      tagline: 'For serious dreamworkers',
      features: [
        'Unlimited AI dream readings',
        'Long-dream support (extended length)',
        'Everything in Lucid',
        'Early access to new features',
        'Support an indie dream project'
      ]
    }
  };

  const PACKS = [
    { id: 'pack20', credits: 20, price: 2.99, label: 'Starter pack' },
    { id: 'pack60', credits: 60, price: 6.99, label: 'Deep sleeper', best: true },
    { id: 'pack150', credits: 150, price: 12.99, label: 'Night owl' }
  ];

  function monthRef() {
    return new Date().toISOString().slice(0, 7);
  }

  function load() {
    let acc;
    try { acc = JSON.parse(localStorage.getItem(KEY)); } catch (e) { acc = null; }
    if (!acc || !PLANS[acc.plan]) {
      acc = { plan: 'free', billing: 'monthly', packCredits: 0, monthlyUsed: 0, monthRef: monthRef() };
    }
    if (acc.monthRef !== monthRef()) {
      acc.monthlyUsed = 0;
      acc.monthRef = monthRef();
      save(acc);
    }
    return acc;
  }

  function save(acc) {
    localStorage.setItem(KEY, JSON.stringify(acc));
    document.dispatchEvent(new CustomEvent('somnia:credits-changed'));
  }

  function summary() {
    const acc = load();
    const plan = PLANS[acc.plan];
    const monthlyLeft = plan.allowance === Infinity
      ? Infinity
      : Math.max(0, plan.allowance - acc.monthlyUsed);
    return {
      plan: plan,
      billing: acc.billing,
      monthlyLeft: monthlyLeft,
      packCredits: acc.packCredits,
      total: monthlyLeft === Infinity ? Infinity : monthlyLeft + acc.packCredits,
      unlimited: plan.allowance === Infinity
    };
  }

  function canSpend() {
    const s = summary();
    return s.unlimited || s.total > 0;
  }

  /* Spend one credit: monthly allowance first, then pack credits. */
  function spend() {
    const acc = load();
    const plan = PLANS[acc.plan];
    if (plan.allowance === Infinity) return true;
    if (acc.monthlyUsed < plan.allowance) {
      acc.monthlyUsed += 1;
      save(acc);
      return true;
    }
    if (acc.packCredits > 0) {
      acc.packCredits -= 1;
      save(acc);
      return true;
    }
    return false;
  }

  /* Refund a credit when an AI call fails after being charged. */
  function refund() {
    const acc = load();
    const plan = PLANS[acc.plan];
    if (plan.allowance === Infinity) return;
    if (acc.monthlyUsed > 0) acc.monthlyUsed -= 1;
    else acc.packCredits += 1;
    save(acc);
  }

  /* Demo checkout — in production this opens Stripe Checkout and the
     webhook grants credits server-side. */
  function purchasePack(packId) {
    const pack = PACKS.find(function (p) { return p.id === packId; });
    if (!pack) return false;
    const acc = load();
    acc.packCredits += pack.credits;
    save(acc);
    return pack;
  }

  function changePlan(planId, billing) {
    if (!PLANS[planId]) return false;
    const acc = load();
    acc.plan = planId;
    acc.billing = billing === 'yearly' ? 'yearly' : 'monthly';
    save(acc);
    return PLANS[planId];
  }

  /* Nav credit chip */
  function renderBadge() {
    const slot = document.querySelector('[data-credit-badge]');
    if (!slot) return;
    const s = summary();
    const base = slot.getAttribute('data-base') || '';
    const text = s.unlimited ? '∞' : String(s.total);
    slot.innerHTML =
      '<a class="credit-chip" href="' + base + 'pricing.html" title="AI reading credits — tap for plans">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>' +
      '<span>' + text + '</span><span class="visually-hidden"> AI reading credits remaining</span></a>';
  }

  document.addEventListener('DOMContentLoaded', renderBadge);
  document.addEventListener('somnia:credits-changed', renderBadge);

  window.somniaCredits = {
    PLANS: PLANS,
    PACKS: PACKS,
    summary: summary,
    canSpend: canSpend,
    spend: spend,
    refund: refund,
    purchasePack: purchasePack,
    changePlan: changePlan
  };
})();
