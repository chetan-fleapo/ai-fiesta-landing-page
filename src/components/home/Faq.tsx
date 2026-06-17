import { SectionBadge } from '@/components/shared/SectionBadge';
import { FAQ_ITEMS, type FaqBlock } from '@/constants/faq';
import { LINKS } from '@/constants/links';
import * as Accordion from '@radix-ui/react-accordion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from '../shared/ArrowUpRight';

export function Faq() {
  const { t } = useTranslation();

  return (
    <section className="cv-auto py-16" id="faq">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[480px_1fr]">
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="flex flex-col items-center justify-center md:sticky md:top-24 md:mb-56 md:items-start md:justify-start">
            <SectionBadge>{t('faq.label')}</SectionBadge>
            <h2 className="mt-5 text-center font-heading text-[28px] font-bold leading-tight text-foreground sm:text-5xl md:text-left md:text-4xl">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-center text-muted-foreground md:text-left">
              {t('faq.subtitle')}
            </p>
          </div>
          <div className="hidden lg:block">
            <ContactCard />
          </div>
        </div>

        <div>
          <Accordion.Root type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item) => (
              <Accordion.Item
                key={item.question}
                value={item.question}
                className="border-token border-b"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-heading text-lg font-bold leading-6 text-foreground sm:text-xl md:py-6">
                    {item.question}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="space-y-3 pb-6 pr-8 text-[15px] leading-relaxed text-muted-foreground">
                    {item.answer.map((block, index) => (
                      <AnswerBlock key={index} block={block} />
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <div className="mt-8 block lg:hidden">
            <ContactCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard() {
  const { t } = useTranslation();

  return (
    <div className="border-token sticky bottom-4 rounded-2xl border bg-card p-7">
      <h3 className="text-center font-heading text-xl font-bold text-foreground md:text-left md:text-3xl">
        {t('faq.contactTitle')}
      </h3>
      <p className="mt-2 text-center text-sm text-muted-foreground md:text-left">
        {t('faq.contactSubtitle')}
      </p>
      <a
        href={LINKS.supportEmail}
        className="contact-us-btn mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-base font-semibold md:w-auto"
      >
        {t('faq.contactCta')}
        <ArrowUpRight />
      </a>
    </div>
  );
}

function AnswerBlock({ block }: { block: FaqBlock }) {
  if (block.type === 'h') {
    return <p className="font-semibold text-foreground">{block.text}</p>;
  }
  if (block.type === 'list') {
    return (
      <ul className="list-disc space-y-1 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}
