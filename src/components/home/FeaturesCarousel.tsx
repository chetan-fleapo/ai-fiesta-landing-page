import { ChevronLeft } from '@/components/shared/ChevronLeft';
import { ChevronRight } from '@/components/shared/ChevronRight';
import { SectionBadge } from '@/components/shared/SectionBadge';
import { CAROUSEL_SPEED_FACTOR, FEATURE_CARDS } from '@/constants/features';
import { useAutoCarousel } from '@/hooks/useAutoCarousel';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
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
          <SectionBadge>
            <FeatureIcon />
            {t('features.label')}
          </SectionBadge>
          <h2 className="mt-5 font-heading text-[28px] font-bold text-foreground sm:text-3xl md:text-4xl">
            {t('features.titleLine1')}{' '}
            <span className="brand-gradient-text">
              {t('features.titleLine2')}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t('features.subtitle')}</p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-b-0 bg-card dark:border-[#1A231B]">
          {/* Slide images */}
          <div className="relative md:pt-8">
            <div className="feature-glow-circles absolute left-[7%] top-[-10%] size-[200px] rounded-full" />
            <div className="feature-glow-circles absolute bottom-[-10%] right-[7%] size-[200px] rounded-full" />
            {/* Background Mesh */}
            <img
              src="/images/features-images-bg.avif"
              alt="Top right effect"
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute left-0 top-0 z-[1] hidden h-full w-full select-none object-cover md:block"
            />

            {/* Effect Top Right */}
            <img
              src="/images/features-top-right-effect.svg"
              alt="Top right effect"
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute right-0 top-0 z-10 hidden h-auto w-40 select-none dark:opacity-70 md:block"
            />
            {/* Effect Top Left */}
            <img
              src="/images/features-top-left-effect.svg"
              alt="Top right effect"
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-auto w-40 select-none dark:opacity-70 md:block"
            />

            {/* Main Slides Wrapper */}
            <div className="relative z-20 mx-auto rounded-t-3xl !border-b-0 border-[rgba(255,255,255,0.05);] bg-[rgba(0,0,0,0.10)] backdrop-blur-[10px] dark:bg-[rgba(255,255,255,0.10)] md:max-w-[75%] md:border md:px-2 md:pt-2">
              {/* Rectangle Effect */}
              <img
                src="/images/features-rectangle-effect.svg"
                alt="Top right effect"
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute left-[-4px] top-[-4px] z-10 hidden h-auto w-40 select-none dark:opacity-100 md:block"
              />
              <div className="relative mx-auto aspect-[1216/800] w-full overflow-hidden">
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
                      'absolute inset-0 h-full w-full rounded-t-2xl !border-b-0 border-[rgba(255,255,255,0.30)] object-cover object-top transition-opacity [transition-duration:450ms] md:border',
                      active === index ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}

                {/* Prev / next arrows — desktop only */}
                <button
                  type="button"
                  aria-label="Previous feature"
                  onClick={prev}
                  className="border-token-strong absolute left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/50 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80 md:flex"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next feature"
                  onClick={next}
                  className="border-token-strong absolute right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/50 text-foreground backdrop-blur-sm transition-colors hover:bg-background/80 md:flex"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* Tab cards */}
          <div className="border-token relative flex flex-col gap-1 border-t bg-[radial-gradient(63.36%_32.69%_at_0%_99.91%,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0)_100%),radial-gradient(50%_25.8%_at_100%_100%,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0)_100%)] sm:flex-row sm:items-stretch">
            {/* Prev / next arrows — mobile only, on tab cards */}
            <button
              type="button"
              aria-label="Previous feature"
              onClick={prev}
              className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-foreground transition-colors md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={next}
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-foreground transition-colors md:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {FEATURE_CARDS.map((card, index) => (
              <Fragment key={card.key}>
                {index > 0 && (
                  <span className="hidden w-px shrink-0 bg-[linear-gradient(180deg,rgba(186,186,186,0.00)_0%,#BABABA_50%,rgba(186,186,186,0.00)_100%)] md:block" />
                )}
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  className={cn(
                    'relative flex-1 p-8 text-center transition-colors',
                    active !== index && 'hidden md:block'
                  )}
                >
                  {/* Progress bar */}
                  <span className="absolute inset-x-0 top-0 block h-[6px] overflow-hidden bg-foreground/10">
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
                  <span className="block whitespace-nowrap font-heading text-lg font-bold text-foreground">
                    {t(`features.cards.${card.key}.title`)}
                  </span>
                  <span className="mt-1.5 block text-sm text-muted-foreground">
                    {t(`features.cards.${card.key}.description`)}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
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
