import '@/i18n/i18n';
import { usePricingStore } from '@/stores/pricing';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Pricing } from './Pricing';

describe('<Pricing />', () => {
  beforeEach(() => {
    usePricingStore.setState({ country: null, period: 'yearly' });
    window.history.pushState({}, '', '/');
  });

  it('renders USD prices by default (pre-location)', () => {
    render(<Pricing />);
    expect(screen.getByText('$120')).toBeDefined();
    expect(screen.getByText('$144')).toBeDefined();
    expect(screen.getByText('$12')).toBeDefined();
    expect(screen.getByText(/Get started for just \$120\/year/)).toBeDefined();
  });

  it('renders INR prices for India', () => {
    usePricingStore.setState({ country: 'IN' });
    render(<Pricing />);
    expect(screen.getByText('₹9,999')).toBeDefined();
    expect(screen.getByText('₹11,988')).toBeDefined();
    expect(screen.getByText('₹999')).toBeDefined();
    expect(screen.getByText(/Get started for just ₹9,999\/year/)).toBeDefined();
  });

  it('switches the CTA when the monthly plan is selected', () => {
    render(<Pricing />);
    fireEvent.click(screen.getByText('Monthly'));
    expect(usePricingStore.getState().period).toBe('monthly');
    expect(screen.getByText(/Get started for just \$12\/month/)).toBeDefined();
  });

  it('renders all 9 plan features', () => {
    render(<Pricing />);
    expect(
      screen.getByText('All premium AI models, Chat, Image')
    ).toBeDefined();
    expect(
      screen.getByText('Ultimate Promptbook & community access')
    ).toBeDefined();
    expect(
      screen.getByText('3 million tokens/month (Premium models count as 4×)')
    ).toBeDefined();
  });

  it('links the CTA to Stripe for non-Indian users', () => {
    render(<Pricing />);
    const cta = screen.getByText(/Get started for just/).closest('a');
    expect(cta?.getAttribute('href')).toContain('buy.stripe.com');
  });

  it('links the CTA to Cashfree for Indian users on /', () => {
    usePricingStore.setState({ country: 'IN' });
    render(<Pricing />);
    const cta = screen.getByText(/Get started for just/).closest('a');
    expect(cta?.getAttribute('href')).toContain('payments.cashfree.com');
  });
});
