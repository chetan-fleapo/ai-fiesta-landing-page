export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.aifiesta.ai';

export const CALLBACK_URL = 'https://chat.aifiesta.ai/success';
export const MONTHLY_CALLBACK_URL = 'https://aifiesta.link/IQma5Hr';

export const RAZORPAY_KEY_ID =
  import.meta.env.VITE_RAZORPAY_KEY_ID ?? 'rzp_live_R5A77zOyCiorbI';

export const POSTHOG_KEY =
  import.meta.env.VITE_POSTHOG_KEY ??
  'phc_R84bb0G9Vk6ZmgmcTuJNCqo1JgFulH1qltOcaTWLIX5';
export const POSTHOG_HOST =
  import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com';

export const GTM_ID = import.meta.env.VITE_GTM_ID ?? 'GTM-MQ53W9XD';
