import { ArrowRight } from '@/components/shared/ArrowRight';
import { LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NAV_ITEMS = [
  { key: 'features', href: '#Features', id: 'Features' },
  { key: 'pricing', href: '#pricing', id: 'pricing' },
  { key: 'faq', href: '#faq', id: 'faq' },
  { key: 'enterprise', href: '#Enterprise', id: 'Enterprise' },
  { key: 'download', href: '#Download', id: 'Download' }
] as const;

export function Navbar() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === 'light';

  // Scroll-spy: highlight the nav link of the section in view
  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.offsetTop - 100;
        if (window.pageYOffset >= top) current = item.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ background: 'var(--nav-gradient)' }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 md:px-6">
        <a href={LINKS.app} className="flex items-center gap-2.5">
          <img
            src="/images/logo.svg"
            alt="AI Fiesta logo"
            width="44"
            height="44"
            className="h-11 w-11"
          />
          <span className="font-heading text-2xl font-bold text-foreground">
            {t('nav.brand')}
          </span>
        </a>

        {/* Desktop pill nav */}
        <nav className="nav-bar absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-pill px-3 py-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                'rounded-pill px-4 py-2.5 font-sora text-base font-semibold text-[rgba(0,0,0,0.71)] transition-colors hover:text-foreground dark:text-[#fffc]',
                activeId === item.id && 'font-bold text-foreground'
              )}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* <ThemeToggle /> */}
          <a
            href={LINKS.app}
            className={cn(
              'login-btn hidden items-center gap-2 rounded-pill border px-6 py-3 font-heading text-base font-semibold text-foreground transition-colors md:inline-flex',
              isLight && 'light-login-btn'
            )}
          >
            {t('nav.login')}
            <ArrowRight className="size-5" />
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={cn(
                'h-0.5 w-5 bg-foreground transition-transform',
                menuOpen && 'translate-y-2 rotate-45'
              )}
            />
            <span
              className={cn(
                'h-0.5 w-5 bg-foreground transition-opacity',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'h-0.5 w-5 bg-foreground transition-transform',
                menuOpen && '-translate-y-2 -rotate-45'
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-token border-t bg-background px-6 py-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-lg text-foreground"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
          <a
            href={LINKS.app}
            className="border-token-strong mt-2 inline-flex items-center gap-2 rounded-pill border px-6 py-3 font-heading font-semibold text-foreground"
          >
            {t('nav.login')}
            <ArrowRight />
          </a>
        </nav>
      )}
    </header>
  );
}
