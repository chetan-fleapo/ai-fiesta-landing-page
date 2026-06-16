import { ArrowRight } from '@/components/shared/ArrowRight';
import { capture } from '@/lib/analytics';
import { getDerivedMonthly, usePricingStore } from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

function Stars() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f5b301">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function GreenCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#39d47a"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 13l5 5L20 6" />
    </svg>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);
  const monthlyFromYearly = getDerivedMonthly(country);

  return (
    <section className="relative overflow-hidden pb-10 pt-32">
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: 'url(/images/hero-bg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 text-center">
        {/* Badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="border-token flex items-center gap-2 rounded-pill border bg-card/80 px-4 py-2 text-sm text-foreground">
            <img
              src="/images/y-icon.avif"
              alt=""
              width="18"
              height="18"
              className="h-[18px] w-[18px] rounded-full"
            />
            {t('hero.ycBadge')}
          </div>
          <div className="border-token flex items-center gap-2 rounded-pill border bg-card/80 px-4 py-2 text-sm text-foreground">
            <img
              src="/images/live-badge.png"
              alt=""
              width="34"
              height="18"
              className="h-[18px] w-auto"
            />
            {t('hero.liveBadge')}
          </div>
        </div>

        <h1 className="font-heading text-[44px] font-bold leading-[1.1] text-foreground xs:text-[56px] sm:text-[72px]">
          {t('hero.titleLine1')}
          <br />
          <span className="brand-gradient-text">{t('hero.titleLine2')}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[720px] text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>

        {/* Trust chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground">
          <span className="flex items-center gap-2">
            <Stars />
            <span className="text-muted-foreground">
              {t('hero.trustedBy')}
            </span>{' '}
            <strong>{t('hero.trustedUsers')}</strong>
          </span>
          <span className="hidden text-muted-foreground sm:inline">|</span>
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustModels')}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustCancel')}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustUpi')}</strong>
          </span>
        </div>

        {/* Hero visual */}
        <img
          src="/images/banner-llms.avif"
          alt="AI Fiesta connects ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Grok and more"
          width="1536"
          height="528"
          fetchPriority="high"
          decoding="async"
          className="mx-auto mt-4 hidden w-full max-w-[1100px] sm:block"
        />
        <img
          src="/images/mobile-banner-llm.avif"
          alt="AI Fiesta connects the top AI models"
          width="654"
          height="396"
          fetchPriority="high"
          decoding="async"
          className="mx-auto mt-6 w-full max-w-[480px] sm:hidden"
        />

        <a
          href="#pricing"
          onClick={() => capture('cta_clicked', { location: 'hero' })}
          className="btn-pill mt-2 px-8 text-lg"
        >
          {t('hero.ctaPrefix')} {monthlyFromYearly}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
