import { PLAN_IDS, type PlanPeriod } from '@/constants/pricing';
import {
  API_BASE_URL,
  CALLBACK_URL,
  MONTHLY_CALLBACK_URL,
  RAZORPAY_KEY_ID
} from '@/lib/config';

interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string };
  handler: (response: { razorpay_subscription_id: string }) => void;
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

/** Inject checkout.js once, on demand. */
export function loadRazorpayScript() {
  razorpayScriptPromise ??= new Promise<void>((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout'));
    };
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
}

/**
 * Replicates the original handlePayment(): registers the subscriber via the
 * AI Fiesta API, then opens Razorpay checkout for the subscription.
 */
export async function registerAndCheckout(
  name: string,
  email: string,
  period: PlanPeriod
) {
  const plan = PLAN_IDS[period];
  const metadata: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    metadata[key] = value;
  });

  const response = await fetch(
    `${API_BASE_URL}/api/razorpay/register-and-checkout`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        planId: plan.rzpPlanId,
        duration: plan.duration,
        metadata
      })
    }
  );
  if (!response.ok) {
    throw new Error(`Checkout registration failed (${response.status})`);
  }
  const data = (await response.json()) as { id: string };

  await loadRazorpayScript();
  if (!window.Razorpay) throw new Error('Razorpay unavailable');

  const razorpay = new window.Razorpay({
    key: RAZORPAY_KEY_ID,
    subscription_id: data.id,
    name: 'AI Fiesta',
    description: period === 'yearly' ? 'Yearly Plan' : 'Monthly Plan',
    prefill: { name, email },
    handler: (response) => {
      const callback =
        period === 'monthly' ? MONTHLY_CALLBACK_URL : CALLBACK_URL;
      window.location.href = `${callback}?session_id=${response.razorpay_subscription_id}&provider=razorpay`;
    }
  });
  razorpay.open();
}
