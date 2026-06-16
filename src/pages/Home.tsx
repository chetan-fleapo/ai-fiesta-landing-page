import { Calculator } from '@/components/home/Calculator';
import { Enterprise } from '@/components/home/Enterprise';
import { Faq } from '@/components/home/Faq';
import { FeaturesCarousel } from '@/components/home/FeaturesCarousel';
import { FooterCta } from '@/components/home/FooterCta';
import { Hero } from '@/components/home/Hero';
import { Pricing } from '@/components/home/Pricing';
import { SecondaryFeatures } from '@/components/home/SecondaryFeatures';
import { StatsBar } from '@/components/home/StatsBar';
import { Testimonials } from '@/components/home/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { StickyPricingBar } from '@/components/layout/StickyPricingBar';
import { initAnalytics } from '@/lib/analytics';
import { usePricingStore } from '@/stores/pricing';
import { lazy, Suspense, useEffect } from 'react';

const PaymentModal = lazy(() => import('@/components/payment/PaymentModal'));

export function meta() {
  return [
    { title: 'Home' },
    {
      name: 'description',
      content:
        'AI Fiesta lets you chat with top AI models like ChatGPT, Gemini Pro, Claude, Perplexity, Deepseek, and Grok — all under one subscription. Compare model responses side-by-side in real-time and choose the best AI for every task.'
    },
    { property: 'og:title', content: 'Home' },
    {
      property: 'og:description',
      content:
        'AI Fiesta lets you chat with top AI models like ChatGPT, Gemini Pro, Claude, Perplexity, Deepseek, and Grok — all under one subscription. Compare model responses side-by-side in real-time and choose the best AI for every task.'
    },
    {
      property: 'og:image',
      content:
        'https://chat.aifiesta.ai/static/images/backgrounds/social-banner.png'
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ];
}

export default function Home() {
  const fetchLocation = usePricingStore((s) => s.fetchLocation);
  const paymentModalOpen = usePricingStore((s) => s.paymentModalOpen);
  const setPaymentModalOpen = usePricingStore((s) => s.setPaymentModalOpen);

  useEffect(() => {
    void fetchLocation();
    initAnalytics();
  }, [fetchLocation]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <FeaturesCarousel />
        <Pricing />
        <Calculator />
        <Testimonials />
        <SecondaryFeatures />
        <Enterprise />
        <Faq />
        <FooterCta />
      </main>
      <Footer />
      <StickyPricingBar />
      {paymentModalOpen && (
        <Suspense fallback={null}>
          <PaymentModal
            open={paymentModalOpen}
            onClose={() => setPaymentModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
