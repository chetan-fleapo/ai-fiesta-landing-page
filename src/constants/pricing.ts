export type PlanPeriod = 'monthly' | 'yearly';

export interface PriceTable {
  monthly: string;
  yearly: string;
  oldPrice: string;
  save: string;
}

/** Price tables replicated from the original site (default `/` path). */
export const PRICES: { stripe: PriceTable; rzp: PriceTable } = {
  stripe: { monthly: '12', yearly: '120', oldPrice: '144', save: '17%' },
  rzp: { monthly: '999', yearly: '9,999', oldPrice: '11,988', save: '17%' }
};

export interface PlanConfig {
  stripe: string;
  rzpPlanId: string;
  cashfree: string;
  duration: number;
}

export const PLAN_IDS: Record<PlanPeriod, PlanConfig> = {
  monthly: {
    stripe: 'https://buy.stripe.com/5kQbJ0600c5y1Suf1R6Zy05',
    rzpPlanId: 'plan_R5P26ywsgsSbRP',
    cashfree: 'https://payments.cashfree.com/forms/aifiesta-monthly',
    duration: 1
  },
  yearly: {
    stripe: 'https://buy.stripe.com/4gM9AS600c5yfJkaLB6Zy06',
    rzpPlanId: 'plan_R5P2N19ZaZEMtB',
    cashfree: 'https://payments.cashfree.com/forms/aifiesta-yearly',
    duration: 12
  }
};

/** Saved-cost stat shown in the stats bar. */
export const SAVED_COST = { in: '100Cr+', other: '$12Mn+' };

/**
 * Paths where Indian users check out via hosted Cashfree forms (plain links).
 * On any other path, Indian users go through the Razorpay payment modal —
 * same routing as the original site.
 */
export const CASHFREE_PATHS = ['/', '/promo-7999'];
