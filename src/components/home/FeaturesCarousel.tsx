import { SectionBadge } from '@/components/shared/SectionBadge';
import { CAROUSEL_SPEED_FACTOR, FEATURE_CARDS } from '@/constants/features';
import { useAutoCarousel } from '@/hooks/useAutoCarousel';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const DURATIONS = FEATURE_CARDS.map((card) => card.duration);

export function FeaturesCarousel() {
  const { t } = useTranslation();
  const { active, cycle, goTo, next, prev, activeDuration } = useAutoCarousel(
    DURATIONS,
    CAROUSEL_SPEED_FACTOR
  );

  return (
    <section className="py-16" id="Features">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="text-center">
          <SectionBadge>{t('features.label')}</SectionBadge>
          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            {t('features.titleLine1')}{' '}
            <span className="brand-gradient-text">
              {t('features.titleLine2')}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t('features.subtitle')}</p>
        </div>

        <div className="border-token relative mt-10 overflow-hidden rounded-3xl border bg-card">
          {/* Slide images */}
          <div className="relative aspect-[1216/600] w-full">
            {FEATURE_CARDS.map((card, index) => (
              <img
                key={card.key}
                src={card.image}
                alt={t(`features.cards.${card.key}.title`)}
                width="1216"
                height="600"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity [transition-duration:450ms]',
                  active === index ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))}

            {/* Prev / next arrows */}
            <button
              type="button"
              aria-label="Previous feature"
              onClick={prev}
              className="border-token-strong absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/50 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={next}
              className="border-token-strong absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/50 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Tab cards */}
          <div className="border-token grid grid-cols-1 border-t sm:grid-cols-5">
            {FEATURE_CARDS.map((card, index) => (
              <button
                key={card.key}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  'border-token relative px-5 py-6 text-center transition-colors sm:border-l first:sm:border-l-0',
                  active === index
                    ? 'bg-background/40'
                    : 'hidden hover:bg-background/20 sm:block'
                )}
              >
                {/* Progress bar */}
                <span className="absolute inset-x-0 top-0 block h-[3px] overflow-hidden bg-foreground/10">
                  {active === index && (
                    <span
                      key={cycle}
                      className="block h-full origin-left bg-foreground"
                      style={{
                        animation: `progress-fill ${activeDuration}ms linear forwards`
                      }}
                    />
                  )}
                </span>
                <span className="block font-heading text-lg font-bold text-foreground">
                  {t(`features.cards.${card.key}.title`)}
                </span>
                <span className="mt-1.5 block text-sm text-muted-foreground">
                  {t(`features.cards.${card.key}.description`)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
