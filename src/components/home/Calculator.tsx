import { ArrowRight } from '@/components/shared/ArrowRight';
import {
  CALCULATOR_MODELS,
  MAX_VISIBLE_ROWS,
  type CalculatorModel
} from '@/constants/models';
import { useCostCalculator } from '@/hooks/useCostCalculator';
import { capture } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { getDerivedMonthly, usePricingStore } from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

export function Calculator() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);
  const {
    selectedIds,
    selectedModels,
    shakingId,
    expanded,
    setExpanded,
    toggle,
    total,
    formatPrice
  } = useCostCalculator(country);

  const showToggle = selectedModels.length > MAX_VISIBLE_ROWS;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <h2 className="text-center font-heading text-4xl font-bold text-foreground sm:text-5xl">
          {t('calculator.title')}
        </h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_440px]">
          {/* Model tiles */}
          <div>
            <p className="mb-5 text-muted-foreground">
              {t('calculator.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              {CALCULATOR_MODELS.map((model) => (
                <ModelTile
                  key={model.id}
                  model={model}
                  selected={selectedIds.includes(model.id)}
                  shaking={shakingId === model.id}
                  onClick={() => toggle(model.id)}
                />
              ))}
            </div>
          </div>

          {/* Expense panel */}
          <div className="border-token rounded-2xl border bg-card p-6">
            <div className="space-y-4">
              {selectedModels
                .slice(0, expanded ? undefined : MAX_VISIBLE_ROWS)
                .map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-foreground">
                      <img
                        src={model.icon}
                        alt=""
                        width="28"
                        height="28"
                        loading="lazy"
                        className="h-7 w-7 rounded-full"
                      />
                      {model.name}
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(model.yearlyPrice)}
                      <span className="font-normal text-muted-foreground">
                        {t('calculator.perYear')}
                      </span>
                    </span>
                  </div>
                ))}
            </div>

            {showToggle && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-5 flex w-full items-center justify-center gap-1.5 text-sm text-accent-green"
              >
                {expanded
                  ? t('calculator.hideFullList')
                  : t('calculator.viewFullList')}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    'transition-transform duration-200',
                    expanded && 'rotate-180'
                  )}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}

            <div className="border-token mt-6 flex items-center justify-between border-t pt-6">
              <span className="text-muted-foreground">
                {t('calculator.totalExpense')}
              </span>
              <span className="font-heading text-3xl font-bold text-foreground">
                {formatPrice(total)} {t('calculator.perYear')}
              </span>
            </div>

            <a
              href="#pricing"
              onClick={() => capture('cta_clicked', { location: 'calculator' })}
              className="btn-pill-outline mt-6 w-full"
            >
              {t('calculator.ctaPrefix')}{' '}
              <span className="brand-gradient-text font-bold">
                {getDerivedMonthly(country)}
              </span>{' '}
              {t('calculator.ctaSuffix')}
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModelTile({
  model,
  selected,
  shaking,
  onClick
}: {
  model: CalculatorModel;
  selected: boolean;
  shaking: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'relative flex items-center gap-3 rounded-xl border bg-card px-6 py-5 text-lg text-foreground transition-colors',
        selected ? 'border-accent-green' : 'border-token hover:bg-muted',
        shaking && 'animate-shake'
      )}
    >
      <img
        src={model.icon}
        alt=""
        width="28"
        height="28"
        loading="lazy"
        className="h-7 w-7 rounded-full"
      />
      {model.name.replace(/ \(.+\)$/, '')}
      {selected && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 13l5 5L20 6" />
          </svg>
        </span>
      )}
    </button>
  );
}
