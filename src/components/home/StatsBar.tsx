import { SAVED_COST } from '@/constants/pricing';
import { isIndia, usePricingStore } from '@/stores/pricing';
import { useTranslation } from 'react-i18next';

export function StatsBar() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);
  const savedCost = isIndia(country) ? SAVED_COST.in : SAVED_COST.other;

  const cards = [
    { value: t('stats.messages.value'), label: t('stats.messages.label') },
    { value: t('stats.images.value'), label: t('stats.images.label') },
    { value: t('stats.paidUsers.value'), label: t('stats.paidUsers.label') },
    { value: savedCost, label: t('stats.costSaved.label') }
  ];

  return (
    <section className="py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-4 xs:grid-cols-2 md:grid-cols-4 md:px-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="trust-block flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <div className="font-heading text-[44px] font-bold leading-tight text-foreground sm:text-[52px]">
              {card.value}
            </div>
            <div className="mt-2 text-base text-muted-foreground">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
