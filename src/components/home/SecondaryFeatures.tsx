import { SectionBadge } from '@/components/shared/SectionBadge';
import { SECONDARY_FEATURES } from '@/constants/features';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function SecondaryFeatures() {
  const { t } = useTranslation();
  const topRow = SECONDARY_FEATURES.slice(0, 2);
  const bottomRow = SECONDARY_FEATURES.slice(2);

  return (
    <section className="cv-auto py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="text-center">
          <SectionBadge>
            <FeatureIcon /> {t('secondary.label')}
          </SectionBadge>
          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            {t('secondary.titleLine1')}
            <br />
            <span className="brand-gradient-text">
              {t('secondary.titleLine2')}
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {topRow.map((card) => (
            <FeatureBlock
              key={card.key}
              image={card.image}
              lightImage={card.lightImage}
              cardKey={card.key}
              aspectRatio="aspect-[2/1]"
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomRow.map((card) => (
            <FeatureBlock
              key={card.key}
              image={card.image}
              lightImage={card.lightImage}
              cardKey={card.key}
              aspectRatio="aspect-video"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  image,
  lightImage,
  cardKey,
  aspectRatio = 'aspect-[2/1]'
}: {
  image: string;
  lightImage?: string;
  cardKey: string;
  aspectRatio?: string;
}) {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const src =
    mounted && resolvedTheme === 'light' && lightImage ? lightImage : image;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#E8E8E8] bg-card dark:border-[rgba(255,255,255,0.10)]">
      <div className={`${aspectRatio} w-full overflow-hidden`}>
        <img
          src={src}
          alt={t(`secondary.cards.${cardKey}.title`)}
          width="820"
          height="413"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="feature-block -mt-4 rounded-3xl border border-[rgba(232,232,232,0.60)] px-7 py-7 text-center backdrop-blur-[10px] dark:border-[rgba(255,255,255,0.10)]"
        style={{
          transform: 'scale(1.01)'
        }}
      >
        <h3 className="font-heading text-2xl font-bold text-foreground">
          {t(`secondary.cards.${cardKey}.title`)}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {t(`secondary.cards.${cardKey}.description`)}
        </p>
      </div>
    </div>
  );
}

function FeatureIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="stroke-black dark:stroke-white"
    >
      <g clip-path="url(#clip0_1_61054)">
        <path
          d="M8.00104 1.49945L5.50098 3.99951L8.00104 6.49958L10.5011 3.99951L8.00104 1.49945Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.00104 9.50042L5.50098 12.0005L8.00104 14.5006L10.5011 12.0005L8.00104 9.50042Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.001 5.49945L9.50098 7.99951L12.001 10.4996L14.5011 7.99951L12.001 5.49945Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.00104 5.50042L1.50098 8.00049L4.00104 10.5006L6.5011 8.00049L4.00104 5.50042Z"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_61054">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
