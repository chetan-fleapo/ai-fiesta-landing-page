export interface FeatureCard {
  /** i18n key under features.cards */
  key: string;
  image: string;
  /** Auto-advance duration in ms before the carousel speed factor. */
  duration: number;
}

/** Original timings: per-card durations scaled by speedFactor 0.1. */
export const CAROUSEL_SPEED_FACTOR = 0.1;

export const FEATURE_CARDS: FeatureCard[] = [
  {
    key: 'imageStudio',
    image: '/images/feature-image-studio.avif',
    duration: 13000
  },
  {
    key: 'superFiesta',
    image: '/images/feature-super-fiesta.avif',
    duration: 21000
  },
  {
    key: 'avatars',
    image: '/images/feature-avatars.avif',
    duration: 15000
  },
  {
    key: 'projectsMemory',
    image: '/images/feature-projects-memory.avif',
    duration: 15000
  },
  {
    key: 'compareChats',
    image: '/images/feature-compare-chats.webp',
    duration: 15000
  }
];

export interface SecondaryFeatureCard {
  /** i18n key under secondary.cards */
  key: string;
  image: string;
  wide: boolean;
}

export const SECONDARY_FEATURES: SecondaryFeatureCard[] = [
  {
    key: 'webResearch',
    image: '/images/secondary-web-research.svg',
    wide: false
  },
  { key: 'consensus', image: '/images/secondary-consensus.webp', wide: false },
  { key: 'games', image: '/images/secondary-games.webp', wide: true },
  {
    key: 'transcribe',
    image: '/images/secondary-transcribe.webp',
    wide: false
  },
  {
    key: 'promptEnhancement',
    image: '/images/secondary-prompt.webp',
    wide: true
  }
];
