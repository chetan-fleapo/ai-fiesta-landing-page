import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { english } from './locales/english';

// English is bundled statically so prerendered HTML contains real text.
// Additional locales load lazily as separate chunks when added to ./locales.
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(async (language: string) => {
      const module = await import(`./locales/${language}.ts`);
      return module[language];
    })
  )
  .init({
    lng:
      typeof window !== 'undefined'
        ? (localStorage.getItem('ui_locale') ?? 'english')
        : 'english',
    debug: false,
    load: 'currentOnly',
    defaultNS: 'translation',
    ns: ['translation'],
    fallbackLng: 'english',
    resources: { english },
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
