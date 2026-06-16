import {
  CASHFREE_PATHS,
  PLAN_IDS,
  PRICES,
  type PlanPeriod
} from '@/constants/pricing';
import { API_BASE_URL } from '@/lib/config';
import { create } from 'zustand';

interface PricingState {
  /** ISO country code, null until resolved on the client. */
  country: string | null;
  period: PlanPeriod;
  paymentModalOpen: boolean;
  setPeriod: (period: PlanPeriod) => void;
  setPaymentModalOpen: (open: boolean) => void;
  fetchLocation: () => Promise<void>;
}

export const usePricingStore = create<PricingState>((set) => ({
  country: null,
  period: 'yearly',
  paymentModalOpen: false,
  setPeriod: (period) => set({ period }),
  setPaymentModalOpen: (open) => set({ paymentModalOpen: open }),
  fetchLocation: async () => {
    const stored = localStorage.getItem('country');
    if (stored) {
      set({ country: stored });
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/location`);
      const data = (await response.json()) as { country?: string };
      if (data.country) {
        localStorage.setItem('country', data.country);
        set({ country: data.country });
      }
    } catch {
      // Network failure: keep non-IN defaults, same as the original site
    }
  }
}));

export const isIndia = (country: string | null) => country === 'IN';

/** Currency-aware price strings, mirroring the original setPrices(). */
export function getPriceInfo(country: string | null) {
  const india = isIndia(country);
  const table = india ? PRICES.rzp : PRICES.stripe;
  const symbol = india ? '₹' : '$';
  return {
    india,
    symbol,
    monthly: `${symbol}${table.monthly}`,
    yearly: `${symbol}${table.yearly}`,
    oldPrice: `${symbol}${table.oldPrice}`,
    save: table.save
  };
}

/** "₹833/month" derived from the yearly price (Math.round(yearly / 12)). */
export function getDerivedMonthly(country: string | null) {
  const india = isIndia(country);
  const table = india ? PRICES.rzp : PRICES.stripe;
  const yearly = Number(table.yearly.replace(/,/g, ''));
  const monthly = Math.round(yearly / 12);
  const symbol = india ? '₹' : '$';
  return `${symbol}${india ? monthly.toLocaleString('en-IN') : monthly}/month`;
}

/** CTA text like "₹9,999/year" or "₹999/month". */
export function getCtaPriceText(country: string | null, period: PlanPeriod) {
  const info = getPriceInfo(country);
  return period === 'yearly' ? `${info.yearly}/year` : `${info.monthly}/month`;
}

/**
 * Checkout link for the plain-link flows, mirroring the original:
 * IN on the default path uses Cashfree forms, non-IN uses Stripe buy links.
 * Forwards current query params plus the Dub affiliate cookie.
 */
export function getCheckoutLink(country: string | null, period: PlanPeriod) {
  const base = isIndia(country)
    ? PLAN_IDS[period].cashfree
    : PLAN_IDS[period].stripe;
  return withTrackingParams(base);
}

/**
 * Indian visitors on non-Cashfree paths check out through the Razorpay
 * payment modal instead of a hosted checkout link (original behavior).
 */
export function usesPaymentModal(country: string | null) {
  if (!isIndia(country)) return false;
  if (typeof window === 'undefined') return false;
  return !CASHFREE_PATHS.includes(window.location.pathname);
}

function withTrackingParams(base: string) {
  if (typeof window === 'undefined') return base;
  const url = new URL(base);
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => url.searchParams.set(key, value));
  const dubId = document.cookie
    .split('; ')
    .find((c) => c.startsWith('dub_id='))
    ?.split('=')[1];
  if (dubId) url.searchParams.set('client_reference_id', `dub_id_${dubId}`);
  return url.toString();
}
