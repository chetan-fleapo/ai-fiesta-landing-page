import { SectionBadge } from '@/components/shared/SectionBadge';
import { SECONDARY_FEATURES } from '@/constants/features';
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
              cardKey={card.key}
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {bottomRow.map((card) => (
            <FeatureBlock
              key={card.key}
              image={card.image}
              cardKey={card.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ image, cardKey }: { image: string; cardKey: string }) {
  const { t } = useTranslation();
  return (
    <div className="border-token overflow-hidden rounded-3xl border bg-card">
      <img
        src={image}
        alt={t(`secondary.cards.${cardKey}.title`)}
        width="820"
        height="413"
        loading="lazy"
        decoding="async"
        className="w-full object-cover"
      />
      <div className="feature-block rounded-3xl px-7 py-7 text-center backdrop-blur-[10px]">
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
