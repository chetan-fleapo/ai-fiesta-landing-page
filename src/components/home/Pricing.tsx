import { ArrowRight } from '@/components/shared/ArrowRight';
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
          <SectionBadge>
            <PricingIcon /> {t('pricing.label')}
          </SectionBadge>
          <h2 className="mt-5 font-heading text-[28px] font-bold text-foreground sm:text-5xl md:text-4xl">
            {t('pricing.titleLine1')}
            <br />
            <span className="brand-gradient-text">
              {t('pricing.titleLine2')}
            </span>
          </h2>
          <div className="limited-time-badge mx-auto mt-8 inline-flex items-center gap-2 rounded-full px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
            <LimitedTimeIcon />
            <p className="text-left text-sm text-foreground md:text-lg">
              {t('pricing.subtitle')}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[3fr_2fr]">
          {/* Features column */}
          <div className="relative hidden overflow-hidden rounded-3xl border border-[#009CD0] bg-card p-4 dark:border-[#1A231B] dark:bg-[url('/images/pricing-features-bg.avif')] dark:bg-cover dark:bg-center md:block md:p-8">
            <h3 className="relative text-center font-heading text-[28px] font-bold text-foreground">
              {t('pricing.featuresHeading')}
            </h3>
            <FeatureList features={featureList} />
            <img
              src="/images/llms-on-circle.avif"
              alt=""
              width="280"
              height="280"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute bottom-0 right-0 hidden w-[280px] opacity-90 dark:lg:block"
            />
            <img
              src="/images/llms-on-circle-light.webp"
              alt=""
              width="280"
              height="280"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute bottom-0 right-0 hidden w-[280px] opacity-90 lg:block dark:lg:hidden"
            />
          </div>

          {/* Pricing column */}
          <div className="border-token rounded-3xl border bg-card bg-[url('/images/pricing-bg-mobile.webp')] bg-cover bg-center bg-no-repeat p-4 md:bg-none md:p-8">
            <h3 className="text-center font-heading text-[28px] font-bold text-foreground">
              {t('pricing.label')}
            </h3>

            <div className="mt-4 space-y-4 md:mt-6">
              {/* Yearly card */}
              <button
                type="button"
                onClick={() => selectPlan('yearly')}
                className={cn(
                  'block w-full rounded-2xl p-4 text-left transition-all duration-300',
                  period === 'yearly'
                    ? 'border border-accent-green'
                    : 'border border-[#E8E8E8] bg-white dark:border-foreground/5 dark:bg-foreground/5'
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
                    <span className="text-sm text-foreground md:text-lg">
                      {t('pricing.yearly')}{' '}
                      <strong>
                        {t('pricing.saveMore', { percent: prices.save })}
                      </strong>
                    </span>
                    <span
                      className="rounded-pill px-3 py-1 text-xs font-semibold text-white"
                      style={{
                        background:
                          'linear-gradient(270deg, rgba(57, 212, 122, 0.70) -0.12%, rgba(0, 156, 208, 0.70) 95.23%), rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {t('pricing.mostPopular')}
                    </span>
                  </div>
                  <PlanRadio selected={period === 'yearly'} />
                </div>
                <div className="mt-3 flex items-baseline gap-2.5">
                  <span className="old-price text-xl">{prices.oldPrice}</span>
                  <span className="font-heading text-xl font-bold text-foreground md:text-3xl">
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
                  'block w-full rounded-2xl p-4 text-left transition-all duration-300',
                  period === 'monthly'
                    ? 'border border-accent-green'
                    : 'border border-[#E8E8E8] bg-white dark:border-foreground/5 dark:bg-foreground/5'
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
                  <span className="text-sm text-foreground md:text-lg">
                    {t('pricing.monthly')}
                  </span>
                  <PlanRadio selected={period === 'monthly'} />
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-heading text-xl font-bold text-foreground md:text-3xl">
                    {prices.monthly}
                  </span>
                  <span className="text-muted-foreground">
                    {t('pricing.perMonth')}
                  </span>
                </div>
              </button>
            </div>

            <div className="md:hidden">
              <FeatureList features={featureList} />
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
              className="btn-pill mt-7 w-full whitespace-nowrap text-base md:text-lg"
            >
              {t('pricing.ctaPrefix')} {getCtaPriceText(country, period)}
              <ArrowRight />
            </a>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              {t('pricing.paymentsNote')}
            </p>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              {t('pricing.consentPrefix')}{' '}
              <a href={LINKS.privacy} className="font-medium underline">
                {t('pricing.privacyPolicy')}
              </a>{' '}
              {t('pricing.and')}{' '}
              <a href={LINKS.terms} className="font-medium underline">
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

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="relative mt-4 md:mt-6">
      {features.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-3 bg-[linear-gradient(to_right,#00000014_0%,#00000014_50%,transparent_78%)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat py-3 dark:bg-[linear-gradient(to_right,#ffffff14_0%,#ffffff14_50%,transparent_78%)] md:bg-[length:85%_1px]"
        >
          <img
            src="/images/feature-check.svg"
            alt=""
            className="shrink-0"
            aria-hidden="true"
          />
          <span className="text-sm text-foreground md:text-base">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlanRadio({ selected }: { selected: boolean }) {
  return selected ? (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="13" className="fill-black dark:fill-white" />
      <path
        d="M8 13.4l3.2 3.2 6.4-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="text-white dark:text-black"
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
        strokeWidth="2"
        className="text-[#4F4F4F] dark:text-[#4F4F4F]"
      />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-black dark:text-white"
    >
      <g clipPath="url(#clip0_1_61172)">
        <path
          d="M13 3.5H3C2.44772 3.5 2 3.94772 2 4.5V11.5C2 12.0523 2.44772 12.5 3 12.5H13C13.5523 12.5 14 12.0523 14 11.5V4.5C14 3.94772 13.5523 3.5 13 3.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7.5H6C6 8.03043 6.21071 8.53914 6.58579 8.91421C6.96086 9.28929 7.46957 9.5 8 9.5C8.53043 9.5 9.03914 9.28929 9.41421 8.91421C9.78929 8.53914 10 8.03043 10 7.5H14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 5.5H14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_61172">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function LimitedTimeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
    >
      <path
        d="M42.5938 18.3594H44.0625C44.8737 18.3594 45.5312 17.7018 45.5312 16.8906C45.5312 16.0795 44.8737 15.4219 44.0625 15.4219H42.5938C41.7826 15.4219 41.125 16.0795 41.125 16.8906C41.125 17.7018 41.7826 18.3594 42.5938 18.3594Z"
        fill="#39D47A"
      />
      <path
        d="M41.8594 38.1875H43.3281C44.1393 38.1875 44.7969 37.5299 44.7969 36.7188C44.7969 35.9076 44.1393 35.25 43.3281 35.25H41.8594C41.0482 35.25 40.3906 35.9076 40.3906 36.7188C40.3906 37.5299 41.0482 38.1875 41.8594 38.1875Z"
        fill="#39D47A"
      />
      <path
        d="M17.625 39.6562C19.9478 39.6583 22.2434 39.1573 24.3541 38.1875H35.9844C36.3739 38.1875 36.7475 38.0328 37.0229 37.7573C37.2984 37.4819 37.4531 37.1083 37.4531 36.7187C37.4531 36.3292 37.2984 35.9556 37.0229 35.6802C36.7475 35.4047 36.3739 35.25 35.9844 35.25H33.4141C32.9271 35.25 32.4602 35.0566 32.1159 34.7123C31.7716 34.368 31.5781 33.901 31.5781 33.4141C31.5781 32.9271 31.7716 32.4602 32.1159 32.1159C32.4602 31.7715 32.9271 31.5781 33.4141 31.5781H38.1875C38.577 31.5781 38.9506 31.4234 39.2261 31.1479C39.5015 30.8725 39.6562 30.4989 39.6562 30.1094C39.6562 29.7198 39.5015 29.3462 39.2261 29.0708C38.9506 28.7954 38.577 28.6406 38.1875 28.6406H35.6172C35.1303 28.6406 34.6633 28.4472 34.319 28.1029C33.9747 27.7586 33.7812 27.2916 33.7812 26.8047C33.7812 26.3178 33.9747 25.8508 34.319 25.5065C34.6633 25.1622 35.1303 24.9687 35.6172 24.9687H44.0625C44.452 24.9687 44.8256 24.814 45.1011 24.5386C45.3765 24.2631 45.5312 23.8895 45.5312 23.5C45.5312 23.1105 45.3765 22.7369 45.1011 22.4614C44.8256 22.186 44.452 22.0312 44.0625 22.0312H35.6172C35.1303 22.0312 34.6633 21.8378 34.319 21.4935C33.9747 21.1492 33.7812 20.6822 33.7812 20.1953C33.7812 19.7084 33.9747 19.2414 34.319 18.8971C34.6633 18.5528 35.1303 18.3594 35.6172 18.3594H36.7188C37.1083 18.3594 37.4819 18.2046 37.7573 17.9292C38.0328 17.6537 38.1875 17.2802 38.1875 16.8906C38.1875 16.5011 38.0328 16.1275 37.7573 15.8521C37.4819 15.5766 37.1083 15.4219 36.7188 15.4219H34.8828C34.3959 15.4219 33.9289 15.2284 33.5846 14.8841C33.2403 14.5398 33.0469 14.0729 33.0469 13.5859C33.0469 13.099 33.2403 12.632 33.5846 12.2877C33.9289 11.9434 34.3959 11.75 34.8828 11.75H41.125C41.5145 11.75 41.8881 11.5953 42.1636 11.3198C42.439 11.0444 42.5938 10.6708 42.5938 10.2812C42.5938 9.8917 42.439 9.51812 42.1636 9.24268C41.8881 8.96723 41.5145 8.81249 41.125 8.81249H24.3541C22.1593 7.80674 19.7671 7.30563 17.3532 7.346C14.9394 7.38638 12.5652 7.96721 10.4053 9.04579C8.24547 10.1244 6.35478 11.6733 4.87225 13.5787C3.38972 15.4841 2.35305 17.6975 1.83846 20.0562C1.32386 22.415 1.34442 24.859 1.89862 27.2088C2.45282 29.5585 3.52657 31.7542 5.04094 33.6344C6.55531 35.5146 8.47179 37.0315 10.6495 38.0736C12.8272 39.1157 15.2108 39.6565 17.625 39.6562Z"
        fill="white"
      />
      <foreignObject x="-1.6221" y="4.23239" width="48.7781" height="37.0726">
        <div
          style={{
            backdropFilter: 'blur(1.56px)',
            clipPath: 'url(#bgblur_0_1_61186_clip_path)',
            height: '100%',
            width: '100%'
          }}
        ></div>
      </foreignObject>
      <g filter="url(#filter0_i_1_61186)" data-figma-bg-blur-radius="3.11111">
        <path
          d="M17.6253 7.34351C13.4745 7.34385 9.48311 8.94173 6.47874 11.8058C3.47438 14.6699 1.6876 18.5804 1.48893 22.7265C1.48893 22.8175 1.48893 22.9086 1.49774 23.0004C1.65534 25.6209 2.44916 28.1636 3.8105 30.4084C5.17185 32.6531 7.05971 34.5323 9.3107 35.8833C11.5617 37.2343 14.108 38.0164 16.7292 38.1619C21.8853 38.4482 27.0275 36.7185 32.1916 36.7185H34.4374C34.7949 36.7264 35.1439 36.6084 35.4231 36.385C35.7024 36.1616 35.8941 35.8471 35.9649 35.4965C35.9827 35.3599 35.8678 35.2498 35.7301 35.2498H32.68C31.9983 35.2498 31.3446 34.979 30.8625 34.4969C30.3805 34.0149 30.1097 33.3611 30.1097 32.6794C30.1097 31.9978 30.3805 31.344 30.8625 30.862C31.3446 30.3799 31.9983 30.1091 32.68 30.1091H36.6405C36.998 30.1171 37.347 29.999 37.6262 29.7756C37.9055 29.5522 38.0973 29.2377 38.168 28.8871C38.1859 28.7506 38.0709 28.6404 37.9332 28.6404H34.8832C34.2015 28.6404 33.5477 28.3696 33.0657 27.8876C32.5836 27.4055 32.3128 26.7518 32.3128 26.0701C32.3128 25.3884 32.5836 24.7346 33.0657 24.2526C33.5477 23.7706 34.2015 23.4998 34.8832 23.4998H42.5155C42.8731 23.5077 43.222 23.3896 43.5012 23.1662C43.7805 22.9428 43.9723 22.6283 44.043 22.2778C44.0609 22.1412 43.9459 22.031 43.8082 22.031H34.8832C34.2015 22.031 33.5477 21.7602 33.0657 21.2782C32.5836 20.7962 32.3128 20.1424 32.3128 19.4607C32.3128 18.779 32.5836 18.1252 33.0657 17.6432C33.5477 17.1612 34.2015 16.8904 34.8832 16.8904H35.1718C35.5293 16.8983 35.8782 16.7802 36.1575 16.5568C36.4367 16.3334 36.6285 16.0189 36.6993 15.6684C36.7171 15.5318 36.6022 15.4216 36.4644 15.4216H34.1488C33.4671 15.4216 32.8133 15.1508 32.3313 14.6688C31.8493 14.1868 31.5785 13.533 31.5785 12.8513C31.5785 12.1696 31.8493 11.5159 32.3313 11.0338C32.8133 10.5518 33.4671 10.281 34.1488 10.281H39.578C39.9355 10.2889 40.2845 10.1709 40.5637 9.94747C40.843 9.72407 41.0348 9.40956 41.1055 9.05901C41.1234 8.92244 41.0084 8.81226 40.8707 8.81226H27.4351C25.4053 8.81226 23.4214 8.28199 21.4493 7.8012C20.2012 7.49689 18.9175 7.34235 17.6253 7.34351Z"
          fill="url(#paint0_linear_1_61186)"
        />
      </g>
      <path
        d="M17.625 13.2188C11.9468 13.2188 7.34375 17.8218 7.34375 23.5C7.34375 29.1782 11.9468 33.7812 17.625 33.7812C23.3032 33.7812 27.9062 29.1782 27.9062 23.5C27.9062 17.8218 23.3032 13.2188 17.625 13.2188Z"
        fill="#39D47A"
      />
      <path
        d="M16.1561 32.3125C18.1006 32.312 20.0051 31.7602 21.6486 30.721C23.2921 29.6817 24.6072 28.1977 25.4412 26.4412C26.2753 24.6847 26.5941 22.7276 26.3607 20.7972C26.1273 18.8668 25.3513 17.0421 24.1226 15.535C22.1491 13.9274 19.6494 13.109 17.1072 13.2383C14.5651 13.3676 12.1612 14.4354 10.361 16.2349C8.56072 18.0344 7.49202 20.4378 7.36169 22.9799C7.23136 25.522 8.04867 28.0221 9.65545 29.9963C11.4889 31.4975 13.7865 32.3161 16.1561 32.3125Z"
        fill="white"
      />
      <path
        d="M16.8906 24.2344H18.3594V29.375C18.3594 29.5698 18.282 29.7566 18.1443 29.8943C18.0066 30.032 17.8198 30.1094 17.625 30.1094C17.4302 30.1094 17.2434 30.032 17.1057 29.8943C16.968 29.7566 16.8906 29.5698 16.8906 29.375V24.2344Z"
        fill="#3F4D56"
      />
      <path
        d="M12.4844 22.7458H16.8906V24.2146H12.4844C12.2896 24.2146 12.1028 24.1372 11.9651 23.9995C11.8274 23.8618 11.75 23.675 11.75 23.4802C11.75 23.2855 11.8274 23.0987 11.9651 22.9609C12.1028 22.8232 12.2896 22.7458 12.4844 22.7458Z"
        fill="#3F4D56"
      />
      <path
        d="M17.625 31.5781C17.8198 31.5781 18.0066 31.6555 18.1443 31.7932C18.282 31.9309 18.3594 32.1177 18.3594 32.3125V34.5156H16.8906V32.3125C16.8906 32.1177 16.968 31.9309 17.1057 31.7932C17.2434 31.6555 17.4302 31.5781 17.625 31.5781Z"
        fill="#3F4D56"
      />
      <path
        d="M16.8906 12.4844H18.3594V14.6875C18.3594 14.8823 18.282 15.0691 18.1443 15.2068C18.0066 15.3445 17.8198 15.4219 17.625 15.4219C17.4302 15.4219 17.2434 15.3445 17.1057 15.2068C16.968 15.0691 16.8906 14.8823 16.8906 14.6875V12.4844Z"
        fill="#3F4D56"
      />
      <path
        d="M22.6675 30.7647L23.769 32.6741L22.4971 33.4084L21.3955 31.4991C21.2982 31.3304 21.2718 31.13 21.3222 30.9418C21.3726 30.7537 21.4957 30.5933 21.6643 30.4959C21.833 30.3985 22.0334 30.3721 22.2216 30.4226C22.4097 30.473 22.5701 30.596 22.6675 30.7647Z"
        fill="#3F4D56"
      />
      <path
        d="M12.7532 13.5933L13.8547 15.5027C13.9521 15.6714 13.9785 15.8718 13.9281 16.0599C13.8777 16.2481 13.7546 16.4085 13.586 16.5059C13.4173 16.6032 13.2168 16.6296 13.0287 16.5792C12.8406 16.5288 12.6802 16.4057 12.5828 16.2371L11.4812 14.3277L12.7532 13.5933Z"
        fill="#3F4D56"
      />
      <path
        d="M25.6241 27.2705L27.5334 28.3721L26.7991 29.644L24.8897 28.5425C24.721 28.4451 24.598 28.2847 24.5476 28.0966C24.4971 27.9084 24.5235 27.708 24.6209 27.5393C24.7183 27.3707 24.8787 27.2476 25.0668 27.1972C25.255 27.1468 25.4554 27.1732 25.6241 27.2705Z"
        fill="#3F4D56"
      />
      <path
        d="M8.45173 17.3562L10.3611 18.4578C10.5298 18.5552 10.6528 18.7156 10.7032 18.9037C10.7537 19.0918 10.7273 19.2923 10.6299 19.461C10.5325 19.6296 10.3721 19.7527 10.184 19.8031C9.99585 19.8535 9.7954 19.8271 9.62673 19.7297L7.71735 18.6282L8.45173 17.3562Z"
        fill="#3F4D56"
      />
      <path
        d="M26.4375 22.7656H28.6406V24.2344H26.4375C26.2427 24.2344 26.0559 24.157 25.9182 24.0193C25.7805 23.8816 25.7031 23.6948 25.7031 23.5C25.7031 23.3052 25.7805 23.1184 25.9182 22.9807C26.0559 22.843 26.2427 22.7656 26.4375 22.7656Z"
        fill="#3F4D56"
      />
      <path
        d="M6.60938 22.7656H8.8125C9.00727 22.7656 9.19406 22.843 9.33178 22.9807C9.4695 23.1184 9.54688 23.3052 9.54688 23.5C9.54688 23.6948 9.4695 23.8816 9.33178 24.0193C9.19406 24.157 9.00727 24.2344 8.8125 24.2344H6.60938V22.7656Z"
        fill="#3F4D56"
      />
      <path
        d="M26.7983 17.3562L27.5327 18.6282L25.6233 19.7297C25.4547 19.8271 25.2542 19.8535 25.0661 19.8031C24.878 19.7527 24.7176 19.6296 24.6202 19.461C24.5228 19.2923 24.4964 19.0918 24.5468 18.9037C24.5972 18.7156 24.7203 18.5552 24.889 18.4578L26.7983 17.3562Z"
        fill="#3F4D56"
      />
      <path
        d="M10.6292 27.5393C10.7265 27.708 10.7529 27.9084 10.7025 28.0966C10.6521 28.2847 10.529 28.4451 10.3604 28.5425L8.451 29.644L7.71662 28.3721L9.626 27.2705C9.79467 27.1732 9.99511 27.1468 10.1832 27.1972C10.3714 27.2476 10.5318 27.3707 10.6292 27.5393Z"
        fill="#3F4D56"
      />
      <path
        d="M22.4971 13.5933L23.769 14.3277L22.6675 16.2371C22.5701 16.4057 22.4097 16.5288 22.2216 16.5792C22.0334 16.6296 21.833 16.6032 21.6643 16.5059C21.4957 16.4085 21.3726 16.2481 21.3222 16.0599C21.2718 15.8718 21.2982 15.6714 21.3955 15.5027L22.4971 13.5933Z"
        fill="#3F4D56"
      />
      <path
        d="M13.586 30.4959C13.7546 30.5933 13.8777 30.7537 13.9281 30.9418C13.9785 31.13 13.9521 31.3304 13.8547 31.4991L12.7532 33.4084L11.4812 32.6741L12.5828 30.7647C12.6802 30.596 12.8406 30.473 13.0287 30.4226C13.2168 30.3721 13.4173 30.3985 13.586 30.4959Z"
        fill="#3F4D56"
      />
      <path
        d="M17.625 36.7188C20.2394 36.7188 22.7951 35.9435 24.9689 34.491C27.1428 33.0385 28.837 30.974 29.8375 28.5586C30.838 26.1432 31.0998 23.4853 30.5897 20.9211C30.0797 18.357 28.8207 16.0016 26.9721 14.1529C25.1234 12.3043 22.768 11.0453 20.2038 10.5352C17.6397 10.0252 14.9818 10.287 12.5664 11.2875C10.151 12.288 8.0865 13.9822 6.634 16.1561C5.18151 18.3299 4.40624 20.8856 4.40624 23.5C4.40624 27.0058 5.79893 30.3681 8.27793 32.8471C10.7569 35.3261 14.1192 36.7187 17.625 36.7188ZM17.625 13.2187C19.6584 13.2187 21.6462 13.8217 23.337 14.9515C25.0277 16.0812 26.3455 17.6869 27.1236 19.5655C27.9018 21.4442 28.1054 23.5114 27.7087 25.5058C27.312 27.5001 26.3328 29.3321 24.8949 30.7699C23.4571 32.2078 21.6251 33.187 19.6308 33.5837C17.6364 33.9804 15.5692 33.7768 13.6905 32.9986C11.8119 32.2205 10.2062 30.9027 9.07645 29.212C7.94673 27.5212 7.34374 25.5334 7.34374 23.5C7.34374 20.7732 8.42694 18.1582 10.3551 16.2301C12.2832 14.3019 14.8982 13.2187 17.625 13.2187Z"
        fill="#5A6978"
      />
      <path
        d="M16.1565 35.25C18.6823 35.2518 21.1557 34.5293 23.2834 33.1683C25.4112 31.8073 27.1041 29.8648 28.1616 27.571C29.2191 25.2773 29.5967 22.7284 29.2498 20.2265C28.9029 17.7247 27.8459 15.3747 26.2043 13.4552C23.6777 11.2915 20.4278 10.1606 17.1039 10.2887C13.7799 10.4168 10.6267 11.7944 8.27414 14.1461C5.92163 16.4979 4.54309 19.6507 4.41396 22.9746C4.28482 26.2986 5.4146 29.5488 7.57757 32.076C9.96551 34.1261 13.0093 35.2523 16.1565 35.25ZM17.6253 13.2187C19.6587 13.2187 21.6465 13.8217 23.3372 14.9515C25.028 16.0812 26.3458 17.6869 27.1239 19.5655C27.9021 21.4442 28.1057 23.5114 27.709 25.5058C27.3123 27.5001 26.3331 29.3321 24.8952 30.7699C23.4574 32.2078 21.6254 33.187 19.6311 33.5837C17.6367 33.9804 15.5695 33.7768 13.6908 32.9986C11.8122 32.2205 10.2065 30.9027 9.07674 29.212C7.94702 27.5212 7.34404 25.5334 7.34404 23.5C7.34404 20.7732 8.42724 18.1582 10.3553 16.2301C12.2835 14.3019 14.8985 13.2187 17.6253 13.2187Z"
        fill="#4A5660"
      />
      <path
        d="M17.625 21.6641C16.611 21.6641 15.7891 22.486 15.7891 23.5C15.7891 24.514 16.611 25.3359 17.625 25.3359C18.639 25.3359 19.4609 24.514 19.4609 23.5C19.4609 22.486 18.639 21.6641 17.625 21.6641Z"
        fill="#5A6978"
      />
      <defs>
        <filter
          id="filter0_i_1_61186"
          x="-1.6221"
          y="4.23239"
          width="48.7781"
          height="37.0726"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.75" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1_61186"
          />
        </filter>
        <clipPath
          id="bgblur_0_1_61186_clip_path"
          transform="translate(1.6221 -4.23239)"
        >
          <path d="M17.6253 7.34351C13.4745 7.34385 9.48311 8.94173 6.47874 11.8058C3.47438 14.6699 1.6876 18.5804 1.48893 22.7265C1.48893 22.8175 1.48893 22.9086 1.49774 23.0004C1.65534 25.6209 2.44916 28.1636 3.8105 30.4084C5.17185 32.6531 7.05971 34.5323 9.3107 35.8833C11.5617 37.2343 14.108 38.0164 16.7292 38.1619C21.8853 38.4482 27.0275 36.7185 32.1916 36.7185H34.4374C34.7949 36.7264 35.1439 36.6084 35.4231 36.385C35.7024 36.1616 35.8941 35.8471 35.9649 35.4965C35.9827 35.3599 35.8678 35.2498 35.7301 35.2498H32.68C31.9983 35.2498 31.3446 34.979 30.8625 34.4969C30.3805 34.0149 30.1097 33.3611 30.1097 32.6794C30.1097 31.9978 30.3805 31.344 30.8625 30.862C31.3446 30.3799 31.9983 30.1091 32.68 30.1091H36.6405C36.998 30.1171 37.347 29.999 37.6262 29.7756C37.9055 29.5522 38.0973 29.2377 38.168 28.8871C38.1859 28.7506 38.0709 28.6404 37.9332 28.6404H34.8832C34.2015 28.6404 33.5477 28.3696 33.0657 27.8876C32.5836 27.4055 32.3128 26.7518 32.3128 26.0701C32.3128 25.3884 32.5836 24.7346 33.0657 24.2526C33.5477 23.7706 34.2015 23.4998 34.8832 23.4998H42.5155C42.8731 23.5077 43.222 23.3896 43.5012 23.1662C43.7805 22.9428 43.9723 22.6283 44.043 22.2778C44.0609 22.1412 43.9459 22.031 43.8082 22.031H34.8832C34.2015 22.031 33.5477 21.7602 33.0657 21.2782C32.5836 20.7962 32.3128 20.1424 32.3128 19.4607C32.3128 18.779 32.5836 18.1252 33.0657 17.6432C33.5477 17.1612 34.2015 16.8904 34.8832 16.8904H35.1718C35.5293 16.8983 35.8782 16.7802 36.1575 16.5568C36.4367 16.3334 36.6285 16.0189 36.6993 15.6684C36.7171 15.5318 36.6022 15.4216 36.4644 15.4216H34.1488C33.4671 15.4216 32.8133 15.1508 32.3313 14.6688C31.8493 14.1868 31.5785 13.533 31.5785 12.8513C31.5785 12.1696 31.8493 11.5159 32.3313 11.0338C32.8133 10.5518 33.4671 10.281 34.1488 10.281H39.578C39.9355 10.2889 40.2845 10.1709 40.5637 9.94747C40.843 9.72407 41.0348 9.40956 41.1055 9.05901C41.1234 8.92244 41.0084 8.81226 40.8707 8.81226H27.4351C25.4053 8.81226 23.4214 8.28199 21.4493 7.8012C20.2012 7.49689 18.9175 7.34235 17.6253 7.34351Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_1_61186"
          x1="6.80983"
          y1="11.8736"
          x2="17.5617"
          y2="41.4103"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#39D47A" />
          <stop offset="1" stopColor="#009CD0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
