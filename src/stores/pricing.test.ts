import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCheckoutLink,
  getCtaPriceText,
  getDerivedMonthly,
  getPriceInfo,
  isIndia,
  usePricingStore,
  usesPaymentModal
} from './pricing';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    }
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

describe('price tables', () => {
  it('uses INR prices for India', () => {
    const info = getPriceInfo('IN');
    expect(info.monthly).toBe('₹999');
    expect(info.yearly).toBe('₹9,999');
    expect(info.oldPrice).toBe('₹11,988');
    expect(info.save).toBe('17%');
  });

  it('uses USD prices outside India', () => {
    for (const country of ['US', 'DE', null]) {
      const info = getPriceInfo(country);
      expect(info.monthly).toBe('$12');
      expect(info.yearly).toBe('$120');
      expect(info.oldPrice).toBe('$144');
    }
  });

  it('derives the monthly-from-yearly price like the original', () => {
    // Math.round(9999 / 12) = 833, Math.round(120 / 12) = 10
    expect(getDerivedMonthly('IN')).toBe('₹833/month');
    expect(getDerivedMonthly('US')).toBe('$10/month');
  });

  it('builds CTA text per plan period', () => {
    expect(getCtaPriceText('IN', 'yearly')).toBe('₹9,999/year');
    expect(getCtaPriceText('IN', 'monthly')).toBe('₹999/month');
    expect(getCtaPriceText('US', 'yearly')).toBe('$120/year');
  });

  it('detects India only for IN', () => {
    expect(isIndia('IN')).toBe(true);
    expect(isIndia('US')).toBe(false);
    expect(isIndia(null)).toBe(false);
  });
});

describe('getCheckoutLink', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    document.cookie = 'dub_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  it('routes Indian users to the Cashfree forms', () => {
    expect(getCheckoutLink('IN', 'yearly')).toContain(
      'payments.cashfree.com/forms/aifiesta-yearly'
    );
    expect(getCheckoutLink('IN', 'monthly')).toContain(
      'payments.cashfree.com/forms/aifiesta-monthly'
    );
  });

  it('routes everyone else to the Stripe buy links', () => {
    expect(getCheckoutLink('US', 'yearly')).toContain('buy.stripe.com');
    expect(getCheckoutLink(null, 'monthly')).toContain('buy.stripe.com');
  });

  it('forwards the current query params', () => {
    window.history.pushState({}, '', '/?utm_source=x&ref=abc');
    const url = new URL(getCheckoutLink('US', 'yearly'));
    expect(url.searchParams.get('utm_source')).toBe('x');
    expect(url.searchParams.get('ref')).toBe('abc');
  });

  it('appends the Dub affiliate cookie as client_reference_id', () => {
    document.cookie = 'dub_id=abc123';
    const url = new URL(getCheckoutLink('IN', 'yearly'));
    expect(url.searchParams.get('client_reference_id')).toBe('dub_id_abc123');
  });
});

describe('usesPaymentModal', () => {
  it('is false on Cashfree paths and for non-Indian users', () => {
    window.history.pushState({}, '', '/');
    expect(usesPaymentModal('IN')).toBe(false);
    expect(usesPaymentModal('US')).toBe(false);

    window.history.pushState({}, '', '/promo-7999');
    expect(usesPaymentModal('IN')).toBe(false);
  });

  it('is true for Indian users on other paths', () => {
    window.history.pushState({}, '', '/diwali');
    expect(usesPaymentModal('IN')).toBe(true);
    expect(usesPaymentModal('US')).toBe(false);
    window.history.pushState({}, '', '/');
  });
});

describe('fetchLocation', () => {
  beforeEach(() => {
    localStorageMock.clear();
    usePricingStore.setState({ country: null });
    vi.restoreAllMocks();
  });

  it('uses the cached country without fetching', async () => {
    localStorageMock.setItem('country', 'IN');
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    await usePricingStore.getState().fetchLocation();

    expect(usePricingStore.getState().country).toBe('IN');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('fetches and caches the country on a cache miss', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ country: 'IN' })
      })
    );

    await usePricingStore.getState().fetchLocation();

    expect(usePricingStore.getState().country).toBe('IN');
    expect(localStorageMock.getItem('country')).toBe('IN');
  });

  it('keeps non-IN defaults when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await usePricingStore.getState().fetchLocation();

    expect(usePricingStore.getState().country).toBeNull();
  });
});
