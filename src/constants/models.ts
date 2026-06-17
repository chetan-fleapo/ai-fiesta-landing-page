export interface CalculatorModel {
  id: string;
  name: string;
  /** Approximate individual subscription cost per year in INR. */
  yearlyPrice: number;
  icon: string;
}

/** Conversion used by the original site for non-IN visitors. */
export const USD_RATE = 93;

/** Minimum number of models that must stay selected. */
export const MIN_SELECTED = 2;

/** Rows shown before the "View full list" toggle. */
export const MAX_VISIBLE_ROWS = 3;

export const CALCULATOR_MODELS: CalculatorModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    yearlyPrice: 20000,
    icon: '/images/models/chatgpt.png'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    yearlyPrice: 23000,
    icon: '/images/models/gemini.png'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    yearlyPrice: 16000,
    icon: '/images/models/perplexity.png'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    yearlyPrice: 8000,
    icon: '/images/models/qwen.png'
  },
  {
    id: 'grok',
    name: 'Grok',
    yearlyPrice: 30000,
    icon: '/images/models/grok.png'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    yearlyPrice: 5000,
    icon: '/images/models/deepseek.png'
  },
  {
    id: 'mistral',
    name: 'Mistral',
    yearlyPrice: 7000,
    icon: '/images/models/mistral.png'
  },
  {
    id: 'claude',
    name: 'Claude',
    yearlyPrice: 22000,
    icon: '/images/models/claude.png'
  },
  {
    id: 'bytedance',
    name: 'ByteDance (Doubao)',
    yearlyPrice: 6000,
    icon: '/images/models/bytedance.png'
  },
  {
    id: 'moonshot',
    name: 'Moonshot (Kimi)',
    yearlyPrice: 4000,
    icon: '/images/models/moonshot.png'
  }
];
