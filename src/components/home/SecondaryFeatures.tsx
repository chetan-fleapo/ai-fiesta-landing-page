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
          <SectionBadge>{t('secondary.label')}</SectionBadge>
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
    <div className="border-token overflow-hidden rounded-2xl border bg-card">
      <img
        src={image}
        alt={t(`secondary.cards.${cardKey}.title`)}
        width="820"
        height="413"
        loading="lazy"
        decoding="async"
        className="w-full object-cover"
      />
      <div className="px-7 py-7 text-center">
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
