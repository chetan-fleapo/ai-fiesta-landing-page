import type { PlanPeriod } from '@/constants/pricing';
import { capture } from '@/lib/analytics';
import {
  getCheckoutLink,
  getPriceInfo,
  usePricingStore,
  usesPaymentModal
} from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Mobile-only sticky bottom bar with the two plan checkout links. */
export function StickyPricingBar() {
  const { t } = useTranslation();
  const { country, setPeriod, setPaymentModalOpen } = usePricingStore();
  const prices = getPriceInfo(country);

  const onClick = (event: React.MouseEvent, plan: PlanPeriod) => {
    setPeriod(plan);
    capture('cta_clicked', { location: 'sticky_bar', plan });
    if (usesPaymentModal(country)) {
      event.preventDefault();
      setPaymentModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden rounded-3xl bg-background/90 backdrop-blur-md sm:hidden">
      {/* gradient top border */}
      <div
        className="mx-auto h-px w-[90%]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #22c55e 30%, #10b981 60%, #06b6d4 85%, transparent 100%)'
        }}
      />

      <div className="grid grid-cols-2 gap-3 p-3">
        {/* Monthly */}
        <a
          href={getCheckoutLink(country, 'monthly')}
          onClick={(event) => onClick(event, 'monthly')}
          className="flex flex-1 flex-col justify-center rounded-2xl border-2 border-[#ffffff3d] p-2 [background:linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.10)_100%)] dark:[background:rgba(255,255,255,0.05)]"
        >
          <span className="text-xs text-foreground">
            {t('stickyBar.monthly')}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-xl font-bold text-foreground">
            {prices.monthly}
            <Chevron className="size-4 text-muted-foreground" />
          </span>
        </a>

        {/* Yearly — green gradient border */}
        <div
          className="flex-1 rounded-2xl p-[2px]"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #10b981, #06b6d4)'
          }}
        >
          <a
            href={getCheckoutLink(country, 'yearly')}
            onClick={(event) => onClick(event, 'yearly')}
            className="flex h-full flex-col justify-center rounded-[15px] bg-[#0e1a14] p-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">
                {t('stickyBar.yearly')}
              </span>
              <span
                className="rounded-pill px-[6px] py-[3px] text-[10px] font-semibold text-white"
                style={{
                  background:
                    'linear-gradient(270deg, rgba(57, 212, 122, 0.70) -0.12%, rgba(0, 156, 208, 0.70) 95.23%), rgba(255, 255, 255, 0.05)'
                }}
              >
                {t('stickyBar.save', { percent: prices.save })}
              </span>
            </div>
            <div className="mt-0.5 flex items-end gap-1.5">
              <span className="mb-[2px] text-xs text-muted-foreground line-through">
                {prices.oldPrice}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xl font-bold text-white">
                {prices.yearly}
                <Chevron className="size-4 text-muted-foreground" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
