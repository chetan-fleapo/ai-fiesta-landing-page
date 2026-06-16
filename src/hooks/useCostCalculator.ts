import { CALCULATOR_MODELS, MIN_SELECTED, USD_RATE } from '@/constants/models';
import { isIndia } from '@/stores/pricing';
import { useCallback, useEffect, useState } from 'react';

export interface CalculatorSelection {
  /** Selected model ids in selection order (newest first). */
  ids: string[];
  /** Id currently shaking after a blocked deselect, if any. */
  shakingId: string | null;
}

/**
 * Cost-calculator behavior replicated from the original site:
 * random 4 models preselected on load, minimum 2 enforced (shake on
 * violation), selected-first ordering with newest selection on top.
 */
export function useCostCalculator(country: string | null) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [shakingId, setShakingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // Random preselection happens client-side only (avoids hydration mismatch)
  useEffect(() => {
    const shuffled = [...CALCULATOR_MODELS].sort(() => Math.random() - 0.5);
    setSelectedIds(shuffled.slice(0, 4).map((m) => m.id));
  }, []);

  const toggle = useCallback((id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        if (current.length <= MIN_SELECTED) {
          setShakingId(id);
          setTimeout(() => setShakingId(null), 300);
          return current;
        }
        return current.filter((selected) => selected !== id);
      }
      return [id, ...current];
    });
  }, []);

  const selectedModels = selectedIds
    .map((id) => CALCULATOR_MODELS.find((m) => m.id === id))
    .filter((m) => m !== undefined);

  const total = selectedModels.reduce((sum, m) => sum + m.yearlyPrice, 0);

  const india = isIndia(country);
  const formatPrice = useCallback(
    (price: number) =>
      india
        ? `₹${price.toLocaleString('en-IN')}`
        : `$${Math.round(price / USD_RATE)}`,
    [india]
  );

  return {
    selectedIds,
    selectedModels,
    shakingId,
    expanded,
    setExpanded,
    toggle,
    total,
    formatPrice
  };
}
