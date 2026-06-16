import { ArrowRight } from '@/components/shared/ArrowRight';
import { CheckIcon } from '@/components/shared/CheckIcon';
import { LINKS } from '@/constants/links';
import { capture } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';

export function Enterprise() {
  const { t } = useTranslation();

  return (
    <section className="cv-auto py-16" id="Enterprise">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="border-token relative overflow-hidden rounded-3xl border bg-card px-8 py-12 sm:px-12">
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
                      <CheckIcon className="h-5 w-5 shrink-0" />
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
    </section>
  );
}
