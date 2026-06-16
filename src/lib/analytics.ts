import { GTM_ID, POSTHOG_HOST, POSTHOG_KEY } from '@/lib/config';

type PosthogModule = typeof import('posthog-js').default;

let posthogPromise: Promise<PosthogModule> | null = null;

/** Lazily load and init PostHog after hydration so it never blocks LCP. */
function getPosthog() {
  posthogPromise ??= import('posthog-js').then(({ default: posthog }) => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      enable_heatmaps: true
    });
    return posthog;
  });
  return posthogPromise;
}

let analyticsStarted = false;

/**
 * Loads analytics on the first user interaction (with a timeout fallback)
 * so PostHog/GTM never compete with LCP rendering.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || analyticsStarted) return;
  const start = () => {
    if (analyticsStarted) return;
    analyticsStarted = true;
    for (const event of INTERACTION_EVENTS) {
      window.removeEventListener(event, start);
    }
    void getPosthog();
    injectGtm();
  };
  const INTERACTION_EVENTS = [
    'pointerdown',
    'keydown',
    'scroll',
    'touchstart'
  ] as const;
  for (const event of INTERACTION_EVENTS) {
    window.addEventListener(event, start, { once: true, passive: true });
  }
  setTimeout(start, 8000);
}

export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  void getPosthog().then((posthog) => posthog.capture(event, properties));
}

let gtmInjected = false;
function injectGtm() {
  if (gtmInjected || !GTM_ID) return;
  gtmInjected = true;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
