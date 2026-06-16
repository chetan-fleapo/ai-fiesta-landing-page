import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Auto-advancing carousel with per-slide durations, replicating the original
 * feature slider (fallbackDurations scaled by a speed factor).
 */
export function useAutoCarousel(durations: number[], speedFactor: number) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // re-arms the progress bar on repeat
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = durations.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
      setCycle((c) => c + 1);
    },
    [count]
  );

  useEffect(() => {
    const duration = durations[active] * speedFactor;
    timerRef.current = setTimeout(() => {
      goTo(active + 1);
    }, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, cycle, durations, speedFactor, goTo]);

  return {
    active,
    cycle,
    goTo,
    next: () => goTo(active + 1),
    prev: () => goTo(active - 1),
    activeDuration: durations[active] * speedFactor
  };
}
