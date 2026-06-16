import { ArrowRight } from '@/components/shared/ArrowRight';
import { CheckIcon } from '@/components/shared/CheckIcon';
import { SectionBadge } from '@/components/shared/SectionBadge';
import { LINKS } from '@/constants/links';
import type { PlanPeriod } from '@/constants/pricing';
import { capture } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import {
  getCheckoutLink,
  getCtaPriceText,
  getPriceInfo,
  usePricingStore,
  usesPaymentModal
} from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

export function Pricing() {
  const { t } = useTranslation();
  const { country, period, setPeriod, setPaymentModalOpen } = usePricingStore();
  const prices = getPriceInfo(country);
  const featureList = t('pricing.featureList', {
    returnObjects: true
  }) as string[];

  const selectPlan = (plan: PlanPeriod) => {
    setPeriod(plan);
    capture('plan_toggled', { plan });
  };

  return (
    <section className="py-16" id="pricing">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="text-center">
          <SectionBadge>{t('pricing.label')}</SectionBadge>
          <h2 className="mt-5 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            {t('pricing.titleLine1')}
            <br />
            <span className="brand-gradient-text">
              {t('pricing.titleLine2')}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t('pricing.subtitle')}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Features column */}
          <div className="border-token relative overflow-hidden rounded-3xl border bg-card p-8 sm:p-10">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(315deg, rgba(57, 212, 122, 0.07) 0%, rgba(0, 156, 208, 0.05) 100%)'
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, #39d47a, #009cd0)'
              }}
              aria-hidden="true"
            />
            <h3 className="relative text-center font-heading text-3xl font-bold text-foreground">
              {t('pricing.featuresHeading')}
            </h3>
            <ul className="relative mt-8 space-y-4">
              {featureList.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckIcon className="shrink-0" />
                  <span className="text-[15px] text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <img
              src="/images/llms-on-circle.avif"
              alt=""
              width="380"
              height="380"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -bottom-16 -right-16 hidden w-[380px] opacity-90 lg:block"
            />
          </div>

          {/* Pricing column */}
          <div className="border-token rounded-3xl border bg-card p-8 sm:p-10">
            <h3 className="text-center font-heading text-3xl font-bold text-foreground">
              {t('pricing.label')}
            </h3>

            <div className="mt-8 space-y-4">
              {/* Yearly card */}
              <button
                type="button"
                onClick={() => selectPlan('yearly')}
                className={cn(
                  'block w-full rounded-2xl p-6 text-left transition-all duration-300',
                  period === 'yearly'
                    ? 'border-2 border-accent-green'
                    : 'border-token-strong border-2 bg-foreground/5'
                )}
                style={
                  period === 'yearly'
                    ? {
                        background:
                          'linear-gradient(315deg, rgba(57, 212, 122, 0.08), rgba(0, 156, 208, 0.08))'
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-lg text-foreground">
                      {t('pricing.yearly')}{' '}
                      <strong>
                        {t('pricing.saveMore', { percent: prices.save })}
                      </strong>
                    </span>
                    <span
                      className="rounded-pill px-3 py-1 text-xs font-semibold text-white"
                      style={{
                        background:
                          'linear-gradient(90deg, #30a46c, #39d47a 60%, #009cd0)'
                      }}
                    >
                      {t('pricing.mostPopular')}
                    </span>
                  </div>
                  <PlanRadio selected={period === 'yearly'} />
                </div>
                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="old-price text-xl">{prices.oldPrice}</span>
                  <span className="font-heading text-4xl font-bold text-foreground">
                    {prices.yearly}
                  </span>
                  <span className="text-muted-foreground">
                    {t('pricing.perYear')}
                  </span>
                </div>
              </button>

              {/* Monthly card */}
              <button
                type="button"
                onClick={() => selectPlan('monthly')}
                className={cn(
                  'block w-full rounded-2xl p-6 text-left transition-all duration-300',
                  period === 'monthly'
                    ? 'border-2 border-accent-green'
                    : 'border-token-strong border-2 bg-foreground/5'
                )}
                style={
                  period === 'monthly'
                    ? {
                        background:
                          'linear-gradient(315deg, rgba(57, 212, 122, 0.08), rgba(0, 156, 208, 0.08))'
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg text-foreground">
                    {t('pricing.monthly')}
                  </span>
                  <PlanRadio selected={period === 'monthly'} />
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-foreground">
                    {prices.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    {t('pricing.perMonth')}
                  </span>
                </div>
              </button>
            </div>

            <a
              href={getCheckoutLink(country, period)}
              onClick={(event) => {
                capture('cta_clicked', { location: 'pricing' });
                if (usesPaymentModal(country)) {
                  event.preventDefault();
                  setPaymentModalOpen(true);
                }
              }}
              className="btn-pill mt-7 w-full text-lg"
            >
              {t('pricing.ctaPrefix')} {getCtaPriceText(country, period)}
              <ArrowRight />
            </a>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {t('pricing.paymentsNote')}
            </p>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              {t('pricing.consentPrefix')}{' '}
              <a href={LINKS.privacy} className="underline">
                {t('pricing.privacyPolicy')}
              </a>{' '}
              {t('pricing.and')}{' '}
              <a href={LINKS.terms} className="underline">
                {t('pricing.terms')}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanRadio({ selected }: { selected: boolean }) {
  return selected ? (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="13" fill="#fff" />
      <path
        d="M8 13.4l3.2 3.2 6.4-7"
        stroke="#000"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle
        cx="13"
        cy="13"
        r="11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-foreground"
      />
    </svg>
  );
}
