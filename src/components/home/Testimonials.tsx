import { SectionBadge } from '@/components/shared/SectionBadge';
import { TESTIMONIALS, type Testimonial } from '@/constants/testimonials';
import { useTranslation } from 'react-i18next';

const ROW_ONE = TESTIMONIALS.slice(0, 5);
const ROW_TWO = TESTIMONIALS.slice(5);

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="cv-auto py-16">
      <div className="text-center">
        <SectionBadge>{t('testimonials.labelUseCases')}</SectionBadge>
        <h2 className="brand-gradient-text mt-5 font-heading text-4xl font-bold sm:text-5xl">
          {t('testimonials.labelTestimonials')}
        </h2>

        <div className="mt-8 flex items-center justify-center gap-10">
          <LaurelStat
            value={t('testimonials.reviewsValue')}
            label={t('testimonials.reviewsLabel')}
          />
          <LaurelStat
            value={t('testimonials.ratingValue')}
            label={t('testimonials.ratingLabel')}
            star
          />
        </div>
      </div>

      <div className="marquee-wrapper mt-12 space-y-6">
        <MarqueeRow items={ROW_ONE} reverse={false} />
        <MarqueeRow items={ROW_TWO} reverse />
      </div>
    </section>
  );
}

function LaurelStat({
  value,
  label,
  star
}: {
  value: string;
  label: string;
  star?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <LaurelBranch flip />
      <div>
        <div className="flex items-center justify-center gap-1.5 font-heading text-3xl font-bold text-foreground">
          {value}
          {star && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#f5b301"
              aria-hidden="true"
            >
              <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
            </svg>
          )}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <LaurelBranch />
    </div>
  );
}

function LaurelBranch({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="26"
      height="58"
      viewBox="0 0 29 63"
      fill="none"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path
        d="M4 2c8 8 12 18 12 29S12 53 4 61M9 8c4 1 7 4 8 8-4-1-7-4-8-8zm6 12c4 1 7 4 8 8-4-1-7-4-8-8zm2 13c4 1 7 4 8 8-4-1-7-4-8-8zm-2 12c4 1 7 4 8 8-4-1-7-4-8-8z"
        stroke="#d4af37"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MarqueeRow({
  items,
  reverse
}: {
  items: Testimonial[];
  reverse: boolean;
}) {
  // Track content duplicated once: animating -50% loops seamlessly
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-6 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((item, index) => (
          <TestimonialCard key={`${item.author}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="trust-block w-[420px] shrink-0 rounded-2xl p-7">
      <div className="relative flex gap-1" aria-label="5 star rating">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#f5b301"
            aria-hidden="true"
          >
            <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="relative mt-4 min-h-[56px] text-lg leading-snug text-foreground">
        {item.quote}
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.author}
            width="44"
            height="44"
            loading="lazy"
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted font-heading font-bold text-foreground">
            {item.author[0]}
          </span>
        )}
        <span>
          <span className="block font-semibold text-foreground">
            {item.author}
          </span>
          <span className="block text-sm text-muted-foreground">
            {item.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
