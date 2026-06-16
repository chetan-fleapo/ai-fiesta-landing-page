import '@/i18n/i18n';
import { usePricingStore } from '@/stores/pricing';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { StatsBar } from './StatsBar';

describe('<StatsBar />', () => {
  beforeEach(() => {
    usePricingStore.setState({ country: null });
  });

  it('renders the four stat cards with USD saved-cost by default', () => {
    render(<StatsBar />);
    expect(screen.getByText('60M+')).toBeDefined();
    expect(screen.getByText('3.5M+')).toBeDefined();
    expect(screen.getByText('100K+')).toBeDefined();
    expect(screen.getByText('$12Mn+')).toBeDefined();
    expect(screen.getByText('Total Cost Saved')).toBeDefined();
  });

  it('swaps the saved-cost stat for Indian users', () => {
    usePricingStore.setState({ country: 'IN' });
    render(<StatsBar />);
    expect(screen.getByText('100Cr+')).toBeDefined();
    expect(screen.queryByText('$12Mn+')).toBeNull();
  });
});
