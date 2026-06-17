export interface FeatureCard {
  /** i18n key under features.cards */
  key: string;
  image: string;
  /** Auto-advance duration in ms before the carousel speed factor. */
  duration: number;
}

/** Original timings: per-card durations scaled by speedFactor 0.1. */
export const CAROUSEL_SPEED_FACTOR = 0.2;

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
  /** Optional light-mode variant; falls back to `image` if omitted. */
  lightImage?: string;
  wide: boolean;
}

export const SECONDARY_FEATURES: SecondaryFeatureCard[] = [
  {
    key: 'webResearch',
    image: '/images/secondary-web-research.svg',
    lightImage: '/images/light-web-deepsearch.webp',
    wide: false
  },
  {
    key: 'consensus',
    image: '/images/secondary-consensus.webp',
    lightImage: '/images/consensus-light.webp',
    wide: false
  },
  {
    key: 'games',
    image: '/images/secondary-games.webp',
    lightImage: '/images/games-light.webp',
    wide: true
  },
  {
    key: 'transcribe',
    image: '/images/secondary-transcribe.webp',
    lightImage: '/images/transcribe-audio-light.webp',
    wide: false
  },
  {
    key: 'promptEnhancement',
    image: '/images/secondary-prompt.webp',
    lightImage: '/images/prompt-enhancement-light.webp',
    wide: true
  }
];
