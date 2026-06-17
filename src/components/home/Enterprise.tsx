import { ArrowRight } from '@/components/shared/ArrowRight';
import { LINKS } from '@/constants/links';
import { capture } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';

export function Enterprise() {
  const { t } = useTranslation();

  return (
    <section className="cv-auto py-16" id="Enterprise">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#009CD0_0%,#39D47A_100%)] p-px">
          <div className="relative overflow-hidden rounded-3xl bg-card px-8 py-12 sm:px-12">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 80% at 100% 0%, rgba(0, 156, 208, 0.1), transparent 60%), radial-gradient(60% 80% at 0% 100%, rgba(57, 212, 122, 0.08), transparent 60%)'
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  {t('enterprise.titlePrefix')}{' '}
                  <span className="brand-gradient-text">
                    {t('enterprise.titleHighlight')}
                  </span>
                </h2>
                <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-8">
                  {(['support', 'fullAccess', 'bestPrice'] as const).map(
                    (key) => (
                      <li
                        key={key}
                        className="flex items-center gap-2.5 text-foreground"
                      >
                        <GreenCheck />
                        {t(`enterprise.${key}`)}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noreferrer"
                onClick={() => capture('discovery_call_clicked')}
                className="btn-pill shrink-0"
              >
                {t('enterprise.cta')}
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GreenCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1.24733 5.48035C1.01115 5.48103 0.779975 5.55029 0.580562 5.68012C0.381149 5.80995 0.221644 5.99505 0.1205 6.21399C0.0193555 6.43294 -0.0192938 6.67678 0.00902314 6.91732C0.03734 7.15786 0.131466 7.38526 0.280511 7.57321L3.4578 11.5659C3.57109 11.7102 3.71631 11.8247 3.88139 11.8999C4.04647 11.975 4.22665 12.0087 4.40697 11.9981C4.79262 11.9768 5.1408 11.7652 5.36279 11.4172L11.9628 0.513395C11.9639 0.511587 11.965 0.509778 11.9662 0.507996C12.0281 0.410456 12.008 0.217158 11.8802 0.0957254C11.8451 0.0623786 11.8037 0.036759 11.7586 0.0204444C11.7135 0.0041297 11.6655 -0.0025346 11.6178 0.000862027C11.5701 0.00425866 11.5235 0.0176443 11.481 0.0401944C11.4385 0.0627446 11.401 0.0939818 11.3707 0.131982C11.3683 0.13497 11.3659 0.137913 11.3634 0.14081L4.70712 7.85557C4.68179 7.88493 4.65103 7.90883 4.61662 7.92589C4.58221 7.94295 4.54484 7.95282 4.50668 7.95494C4.46852 7.95706 4.43033 7.95137 4.39432 7.93822C4.35832 7.92507 4.32523 7.90471 4.29696 7.87833L2.08788 5.81614C1.85845 5.60039 1.55858 5.48059 1.24733 5.48035Z"
        fill="url(#paint0_linear_1_60828)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_60828"
          x1="11.522"
          y1="2.15719"
          x2="0.477974"
          y2="2.15719"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#39D47A" />
          <stop offset="1" stop-color="#009CD0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
