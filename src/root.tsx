import { ThemeProvider } from 'next-themes';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './i18n/i18n';
import './index.css';

export function links() {
  return [
    { rel: 'icon', type: 'image/png', href: '/images/favicon-36.png' },
    { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: '/fonts/inter-var.woff2',
      crossOrigin: 'anonymous' as const
    },
    {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      href: '/fonts/sora-var.woff2',
      crossOrigin: 'anonymous' as const
    },
    // LCP hero images, one per breakpoint
    {
      rel: 'preload',
      as: 'image',
      href: '/images/banner-llms.avif',
      media: '(min-width: 768px)',
      fetchPriority: 'high' as const
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/mobile-banner-llm.avif',
      media: '(max-width: 767px)',
      fetchPriority: 'high' as const
    }
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
