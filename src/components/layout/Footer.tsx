import { LINKS } from '@/constants/links';
import { capture } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="relative overflow-hidden bg-cover bg-top"
      id="Download"
      style={{ backgroundImage: 'var(--footer-bg-image)' }}
    >
      <div className="mx-auto max-w-[1320px] px-4 pt-24 md:px-6">
        <div className="text-center">
          <p className="font-heading text-lg font-semibold text-foreground">
            {t('download.title')}
          </p>
          <div className="mt-5 flex items-center justify-center gap-4">
            <a
              href={LINKS.appStore}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                capture('download_clicked', { store: 'app_store' })
              }
              className="btn-pill-outline px-7 py-3 text-base"
            >
              <img
                src="/images/apple.svg"
                alt=""
                width="18"
                height="20"
                loading="lazy"
                className="h-5 w-auto dark:invert-0"
              />
              {t('download.appStore')}
            </a>
            <a
              href={LINKS.playStore}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                capture('download_clicked', { store: 'play_store' })
              }
              className="btn-pill-outline px-7 py-3 text-base"
            >
              <img
                src="/images/playstore.svg"
                alt=""
                width="18"
                height="20"
                loading="lazy"
                className="h-5 w-auto"
              />
              {t('download.playStore')}
            </a>
          </div>
        </div>

        {/* Giant fading wordmark */}
        <div
          className="mt-16 select-none text-center font-heading text-[20vw] font-bold leading-none tracking-tight"
          style={{
            backgroundImage:
              'linear-gradient(180deg, hsl(var(--foreground) / 0.85), hsl(var(--foreground) / 0.05))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
          aria-hidden="true"
        >
          AI&nbsp;Fiesta
        </div>

        <div className="border-token flex flex-col items-center justify-between gap-5 border-t py-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <nav className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href={LINKS.privacy} className="hover:text-foreground">
              {t('footer.privacyPolicy')}
            </a>
            <a href={LINKS.terms} className="hover:text-foreground">
              {t('footer.terms')}
            </a>
          </nav>
          <div className="flex items-center gap-5 text-muted-foreground">
            <a
              aria-label="Instagram"
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.2"
                  cy="6.8"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <a
              aria-label="X"
              href={LINKS.x}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.1 3.8H5.3l12.5 16.3z" />
              </svg>
            </a>
            <a
              aria-label="LinkedIn"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14.8H.2V8zm7.4 0h4.4v2h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.5 3.1 5.5 7v8.2h-4.6v-7.3c0-1.7 0-4-2.4-4s-2.8 1.9-2.8 3.9v7.4H7.6V8z" />
              </svg>
            </a>
            <a
              aria-label="YouTube"
              href={LINKS.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
