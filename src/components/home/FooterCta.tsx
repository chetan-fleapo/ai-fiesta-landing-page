import { ArrowRight } from '@/components/shared/ArrowRight';
import { capture } from '@/lib/analytics';
import { getDerivedMonthly, usePricingStore } from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

export function FooterCta() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);

  return (
    <section className="relative overflow-hidden md:py-28">
      <div className="relative mx-auto max-w-[900px] px-4 text-center">
        <h2 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-[52px]">
          {t('footerCta.titleLine1')}
          <br />
          <span className="brand-gradient-text">
            {t('footerCta.titleLine2')}
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground">{t('footerCta.subtitle')}</p>
        <a
          href="#pricing"
          onClick={() => capture('cta_clicked', { location: 'footer' })}
          className="btn-pill mt-9"
        >
          {t('footerCta.ctaPrefix')} {getDerivedMonthly(country)}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}
