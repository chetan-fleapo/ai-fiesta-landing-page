import { SectionBadge } from '@/components/shared/SectionBadge';
import { FAQ_ITEMS, type FaqBlock } from '@/constants/faq';
import { LINKS } from '@/constants/links';
import * as Accordion from '@radix-ui/react-accordion';
import { useTranslation } from 'react-i18next';

export function Faq() {
  const { t } = useTranslation();

  return (
    <section className="cv-auto py-16" id="faq">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[420px_1fr]">
        <div>
          <SectionBadge>{t('faq.label')}</SectionBadge>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('faq.subtitle')}</p>

          <div className="border-token mt-10 rounded-2xl border bg-card p-7">
            <h3 className="font-heading text-xl font-bold text-foreground">
              {t('faq.contactTitle')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('faq.contactSubtitle')}
            </p>
            <a
              href={LINKS.supportEmail}
              className="btn-pill-outline mt-5 px-6 py-3 text-sm"
            >
              {t('faq.contactCta')}
            </a>
          </div>
        </div>

        <Accordion.Root type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item
              key={item.question}
              value={item.question}
              className="border-token border-b"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-6 text-left font-heading text-lg font-bold text-foreground sm:text-xl">
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
      </div>
    </section>
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
