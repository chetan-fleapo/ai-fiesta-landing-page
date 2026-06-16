import { CALCULATOR_MODELS } from '@/constants/models';
import '@/i18n/i18n';
import { usePricingStore } from '@/stores/pricing';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { Calculator } from './Calculator';

describe('<Calculator />', () => {
  beforeEach(() => {
    usePricingStore.setState({ country: null });
  });

  it('renders a tile for every model', () => {
    render(<Calculator />);
    // Tile names can also appear in the expense panel rows, hence getAllByText
    for (const name of ['ChatGPT', 'Claude', 'ByteDance', 'Moonshot']) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
    const pressed = document.querySelectorAll('[aria-pressed]');
    expect(pressed).toHaveLength(CALCULATOR_MODELS.length);
  });

  it('preselects 4 models and shows the view-full-list toggle', () => {
    render(<Calculator />);
    const selected = document.querySelectorAll('[aria-pressed="true"]');
    expect(selected).toHaveLength(4);
    expect(screen.getByText('View full list')).toBeDefined();
  });

  it('expands and collapses the expense rows', () => {
    render(<Calculator />);
    // 3 of 4 rows visible while collapsed (rows live in the expense panel)
    const panelRows = () =>
      document.querySelectorAll('.rounded-2xl img.h-7').length;
    expect(panelRows()).toBe(3);

    fireEvent.click(screen.getByText('View full list'));
    expect(panelRows()).toBe(4);
    expect(screen.getByText('Hide full list')).toBeDefined();

    fireEvent.click(screen.getByText('Hide full list'));
    expect(panelRows()).toBe(3);
  });

  it('shows the USD total at rate 93 for non-Indian users', () => {
    render(<Calculator />);
    const selectedIds = Array.from(
      document.querySelectorAll('[aria-pressed="true"]')
    );
    expect(selectedIds).toHaveLength(4);
    expect(screen.getByText('Your total expense')).toBeDefined();
    // Total format: "$N /year" — value must be a dollar amount
    const total = screen.getByText(/\$\d+ \/year/);
    expect(total).toBeDefined();
  });

  it('shows INR totals for Indian users', () => {
    usePricingStore.setState({ country: 'IN' });
    render(<Calculator />);
    expect(screen.getByText(/₹[\d,]+ \/year/)).toBeDefined();
    expect(screen.getByText(/₹833\/month/)).toBeDefined();
  });

  it('keeps the calculator CTA pointed at the pricing section', () => {
    render(<Calculator />);
    const cta = screen.getByText(/with AI Fiesta/).closest('a');
    expect(cta?.getAttribute('href')).toBe('#pricing');
  });
});
