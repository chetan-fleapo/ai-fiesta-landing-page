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
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-5 md:px-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="trust-block flex flex-col items-center justify-center px-4 py-6 text-center md:px-6 md:py-12"
          >
            <div className="font-heading text-2xl font-bold leading-tight text-foreground sm:text-4xl md:text-[44px]">
              {card.value}
            </div>
            <div className="mt-2 text-sm text-foreground md:text-base">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
