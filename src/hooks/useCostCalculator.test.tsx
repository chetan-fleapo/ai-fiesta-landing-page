import { CALCULATOR_MODELS } from '@/constants/models';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCostCalculator } from './useCostCalculator';

describe('useCostCalculator', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('preselects 4 random models on mount', () => {
    const { result } = renderHook(() => useCostCalculator(null));
    expect(result.current.selectedIds).toHaveLength(4);
    const validIds = new Set(CALCULATOR_MODELS.map((m) => m.id));
    for (const id of result.current.selectedIds) {
      expect(validIds.has(id)).toBe(true);
    }
  });

  it('puts the newest selection on top', () => {
    const { result } = renderHook(() => useCostCalculator(null));
    const unselected = CALCULATOR_MODELS.find(
      (m) => !result.current.selectedIds.includes(m.id)
    );
    expect(unselected).toBeDefined();
    act(() => result.current.toggle(unselected!.id));
    expect(result.current.selectedIds[0]).toBe(unselected!.id);
  });

  it('enforces a minimum of 2 selections with a shake', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCostCalculator(null));

    // Deselect down to 2
    while (result.current.selectedIds.length > 2) {
      const id = result.current.selectedIds[0];
      act(() => result.current.toggle(id));
    }
    const [first] = result.current.selectedIds;
    act(() => result.current.toggle(first));

    // Still 2 selected, and the blocked tile shakes
    expect(result.current.selectedIds).toHaveLength(2);
    expect(result.current.shakingId).toBe(first);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.shakingId).toBeNull();
  });

  it('totals the selected yearly prices', () => {
    const { result } = renderHook(() => useCostCalculator('IN'));
    const expected = result.current.selectedModels.reduce(
      (sum, m) => sum + m.yearlyPrice,
      0
    );
    expect(result.current.total).toBe(expected);
  });

  it('formats prices in INR for India and USD (rate 93) elsewhere', () => {
    const india = renderHook(() => useCostCalculator('IN'));
    expect(india.result.current.formatPrice(20000)).toBe('₹20,000');

    const us = renderHook(() => useCostCalculator('US'));
    // Math.round(20000 / 93) = 215
    expect(us.result.current.formatPrice(20000)).toBe('$215');
    expect(us.result.current.formatPrice(0)).toBe('$0');
  });
});
