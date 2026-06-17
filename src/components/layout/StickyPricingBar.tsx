import type { PlanPeriod } from '@/constants/pricing';
import { capture } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import {
  getCheckoutLink,
  getPriceInfo,
  usePricingStore,
  usesPaymentModal
} from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

/** Mobile-only sticky bottom bar with the two plan checkout links. */
export function StickyPricingBar() {
  const { t } = useTranslation();
  const { country, period, setPeriod, setPaymentModalOpen } = usePricingStore();
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
    <div className="border-token fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t bg-background/90 p-3 backdrop-blur-md sm:hidden">
      <a
        href={getCheckoutLink(country, 'monthly')}
        onClick={(event) => onClick(event, 'monthly')}
        className={cn(
          'whtie flex flex-1 flex-row items-center justify-center gap-1 rounded-pill border px-4 py-2.5 text-sm',
          period === 'monthly'
            ? 'border-accent-green text-foreground'
            : 'border-token-strong text-muted-foreground'
        )}
      >
        <span className="whitespace-nowrap font-semibold">
          {t('stickyBar.monthly')}
        </span>
        <span className="whitespace-nowrap">
          {prices.monthly}
          {t('pricing.perMonth')}
        </span>
      </a>
      <a
        href={getCheckoutLink(country, 'yearly')}
        onClick={(event) => onClick(event, 'yearly')}
        className="btn-pill flex-1 flex-row items-center justify-center gap-1 px-4 py-2.5 text-sm"
      >
        <span className="whitespace-nowrap font-semibold">
          {t('stickyBar.yearly')} ·{' '}
          {/* {t('stickyBar.save', { percent: prices.save })} */}
        </span>
        <span className="whitespace-nowrap">
          {prices.yearly}
          {t('pricing.perYear')}
        </span>
      </a>
    </div>
  );
}
