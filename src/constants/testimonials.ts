export interface Testimonial {
  author: string;
  role: string;
  quote: string;
  avatar: string | null;
}

/** Testimonials copied verbatim from the original site (JSON-LD + cards). */
export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Anupama',
    role: 'PhD Scholar | India',
    quote:
      'I rely on AI Fiesta for literature review, citations & paper publishing.',
    avatar: '/images/testimonials/anupama.png'
  },
  {
    author: 'Romanbardewa',
    role: 'Multi-Model User | India',
    quote:
      'All the big AI models in one place — no need for six different subscriptions.',
    avatar: '/images/testimonials/romanbardewa.webp'
  },
  {
    author: 'Mrunal',
    role: 'Image Analysis Pro | India',
    quote: 'I upload 60 images a day — AI Fiesta handles it all beautifully.',
    avatar: '/images/testimonials/mrunal.webp'
  },
  {
    author: 'Anthiya Lopes',
    role: 'Marketing Pro | Canada',
    quote: 'As a small marketing company, AI Fiesta is a great option for us.',
    avatar: '/images/testimonials/anthiya.webp'
  },
  {
    author: 'Shirly Joseph',
    role: 'Creative Artist | India',
    quote: 'AI Fiesta makes it possible for senior citizens to use AI easily.',
    avatar: '/images/testimonials/shirly.webp'
  },
  {
    author: 'Dr. Danish',
    role: 'Parent',
    quote: 'I use your app to write grant proposals for my NGO for the poor.',
    avatar: '/images/testimonials/danish.png'
  },
  {
    author: 'Anunitin',
    role: 'AI Video Creator | India',
    quote:
      'I restarted my AI video journey — other platforms were too expensive.',
    avatar: '/images/testimonials/anunitin.png'
  },
  {
    author: 'Mostofa',
    role: 'Knowledge Worker | India',
    quote: 'It significantly reduced my daily workload. Great value for price.',
    avatar: '/images/testimonials/mostofa.png'
  },
  {
    author: 'Veena Mathew',
    role: 'Sr. Test Engineer | India',
    quote: 'Subscribed day one. Been using it extensively for test automation.',
    avatar: '/images/testimonials/veena.png'
  },
  {
    author: 'Khalid Sattar',
    role: 'Content Creator | India',
    quote: 'I use AI Fiesta daily for content and images. Very satisfied.',
    avatar: null
  }
];
