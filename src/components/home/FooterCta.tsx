import { ArrowRight } from '@/components/shared/ArrowRight';
import { capture } from '@/lib/analytics';
import { getDerivedMonthly, usePricingStore } from '@/stores/pricing';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function FooterCta() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);

  return (
    <section className="relative overflow-hidden py-28">
      <Particles />
      <div className="relative mx-auto max-w-[900px] px-4 text-center">
        <h2 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-[52px]">
          {t('footerCta.titleLine1')}
          <br />
          <span className="brand-gradient-text">
            {t('footerCta.titleLine2')}
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground">{t('footerCta.subtitle')}</p>
        <a
          href="#pricing"
          onClick={() => capture('cta_clicked', { location: 'footer' })}
          className="btn-pill mt-9"
        >
          {t('footerCta.ctaPrefix')} {getDerivedMonthly(country)}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

/**
 * Lightweight canvas replacement for the original particles.js star field.
 * Pauses when offscreen and respects prefers-reduced-motion.
 */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();

    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      drift: number;
      green: boolean;
      phase: number;
    }
    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.6 + Math.random() * 0.9,
      speed: 0.00012 + Math.random() * 0.0002,
      drift: (Math.random() - 0.5) * 0.0002,
      green: Math.random() < 0.25,
      phase: Math.random() * Math.PI * 2
    }));

    const draw = (time: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.y -= star.speed;
        star.x += star.drift;
        if (star.y < 0) star.y = 1;
        if (star.x < 0) star.x = 1;
        if (star.x > 1) star.x = 0;
        const twinkle = 0.55 + 0.4 * Math.sin(time / 900 + star.phase);
        ctx.globalAlpha = twinkle;
        ctx.fillStyle = star.green ? '#9affc4' : '#ffffff';
        ctx.beginPath();
        ctx.arc(
          star.x * width,
          star.y * height,
          star.size * devicePixelRatio,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 dark:opacity-100"
      aria-hidden="true"
    />
  );
}
