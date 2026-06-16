/**
 * FAQ content copied verbatim from the original site.
 * Answer blocks: 'p' = paragraph, 'h' = bold subheading, 'list' = bullet list.
 */
export type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] };

export interface FaqItem {
  question: string;
  answer: FaqBlock[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What exactly is AI Fiesta?',
    answer: [
      {
        type: 'p',
        text: "AI Fiesta is a powerful all-in-one AI platform that gives you access to the world's leading chat, image, research, document, coding, and reasoning models inside one single dashboard. Instead of juggling multiple tools, and subscriptions, you get everything in one unified workspace."
      }
    ]
  },
  {
    question: 'Does AI Fiesta support multiple chats and workflows?',
    answer: [
      {
        type: 'p',
        text: 'Yes. You can create and manage multiple chats at the same time. This allows you to separate your work, studies, business ideas, personal writing, research, and experiments without mixing contexts.'
      }
    ]
  },
  {
    question: 'What AI models are available on AI Fiesta?',
    answer: [
      {
        type: 'p',
        text: "AI Fiesta gives you access to 30+ of the world's leading AI models — all-in-one subscription, with new models added typically within one week of global release."
      },
      { type: 'h', text: 'Frontier Models' },
      {
        type: 'p',
        text: 'ChatGPT 5.4 · Claude Sonnet 4.6 · Gemini 3.1 Pro · Gemini 3 Pro · Grok 4 and all Grok variants'
      },
      { type: 'h', text: 'Research & Search Models' },
      {
        type: 'p',
        text: 'Perplexity Sonar · Perplexity Sonar Pro · Gemini 2.5 Pro · Gemini 2.5 Lite'
      },
      { type: 'h', text: 'Open & Specialist Models' },
      {
        type: 'p',
        text: 'DeepSeek V3.2 · DeepSeek Reasoner (R1) · Kimi K2.5 · Kimi K2 Thinking · Qwen3 · Qwen3-Max-Thinking · Codestral by Mistral · Mistral Large 3'
      },
      { type: 'h', text: 'Image & Creative Models' },
      { type: 'p', text: 'Seedream 4.5 · Seedream 4.0' },
      {
        type: 'p',
        text: 'All standard and premium variants of the above models are included. Premium models deliver deeper reasoning and higher output quality, and consume tokens at a 4× rate. Standard models consume tokens at 1×. You can switch between them at any time.'
      },
      {
        type: 'p',
        text: 'All models are included in the same subscription. New models are added inside the same plan usually within one week of global release.'
      }
    ]
  },
  {
    question: 'How do I choose which model is best for my task?',
    answer: [
      { type: 'p', text: 'You have two powerful modes to choose from:' },
      { type: 'h', text: 'Super Fiesta Mode' },
      {
        type: 'p',
        text: 'This automatically selects the best AI model for your query based on accuracy, depth, creativity, speed and reasoning.'
      },
      { type: 'h', text: 'Multi Chat Mode' },
      {
        type: 'p',
        text: 'With one single prompt, multiple AI models respond together at the same time. You can turn any model on or off anytime and customize which models you want answering your questions.'
      }
    ]
  },
  {
    question: 'Does AI Fiesta offer a consensus or comparison feature?',
    answer: [
      {
        type: 'p',
        text: 'Yes. With Consensus Mode, the same prompt is answered by multiple models simultaneously. The system then compares all responses and shows you the best combined output along with key differences between models so you can make the most informed decision.'
      }
    ]
  },
  {
    question: 'Can I generate documents, reports and deep research?',
    answer: [
      {
        type: 'p',
        text: 'Yes. AI Fiesta supports full document generation and deep research inside the same subscription. You can create reports, business documents, research papers, scripts and long form content easily.'
      },
      {
        type: 'p',
        text: 'To activate it, simply click the plus button and select Document Mode or Deep Research Mode.'
      }
    ]
  },
  {
    question:
      'Does AI Fiesta support live web search and real time information?',
    answer: [
      {
        type: 'p',
        text: 'Yes. When you need updated or real time information, just click the plus button and activate Web Search Mode. Once enabled, the AI will fetch live data directly from the internet.'
      }
    ]
  },
  {
    question: 'Can I generate images on AI Fiesta?',
    answer: [
      {
        type: 'p',
        text: 'Yes. AI Fiesta supports powerful multi model image generation. You can create images using:'
      },
      {
        type: 'list',
        items: [
          'Nano Banana Pro',
          'Nano Banana',
          'Seedream 4.5',
          'Seedream 4.0',
          'GPT Image'
        ]
      },
      {
        type: 'p',
        text: 'With a single prompt, you can generate multiple images simultaneously across different models and compare outputs instantly.'
      }
    ]
  },
  {
    question: 'Does AI Fiesta include games and brain training tools?',
    answer: [
      {
        type: 'p',
        text: 'Yes. AI Fiesta includes smart cognitive games at no additional cost. These games help improve memory, focus, problem solving and mental agility while keeping the experience fun.'
      }
    ]
  },
  {
    question: 'Can I create and manage projects on AI Fiesta?',
    answer: [
      {
        type: 'p',
        text: 'Yes. You can create structured projects directly inside the platform. Just go to the Projects Section and start organizing your work, prompts, outputs, research and documents inside dedicated projects.'
      }
    ]
  },
  {
    question: 'Does AI Fiesta have a memory feature?',
    answer: [
      {
        type: 'p',
        text: 'Yes. AI Fiesta now includes a built in memory feature. You can store your preferences, writing style, goals and important context. The AI will remember this information and apply it across future conversations until you update it.'
      }
    ]
  },
  {
    question: 'Can I use AI Fiesta on multiple devices?',
    answer: [
      {
        type: 'p',
        text: 'Yes. You can use AI Fiesta on multiple devices such as laptop, desktop, tablet and phone. For best security and performance, we recommend not exceeding three to four active devices at a time.'
      }
    ]
  },
  {
    question: 'What are Avatars in AI Fiesta?',
    answer: [
      {
        type: 'p',
        text: 'Avatars let you interact with legendary minds like Albert Einstein, APJ Abdul Kalam, Bhagat Singh, Osho, Rabindranath Tagore and Subhash Chandra Bose. You also get expert coach avatars including Career Coach, Personal Doctor, Personal Trainer, Fitness Coach and Finance Advisor who give personalized guidance based on your question.'
      }
    ]
  },
  {
    question: 'How many tokens do I get with my subscription?',
    answer: [
      { type: 'p', text: 'AI Fiesta offers generous usage limits:' },
      {
        type: 'list',
        items: ['3 million tokens every month', '36 million tokens annually']
      },
      {
        type: 'p',
        text: 'This allows you to use multiple models, image generation, research and projects at scale without worrying about frequent limits.'
      }
    ]
  }
];
