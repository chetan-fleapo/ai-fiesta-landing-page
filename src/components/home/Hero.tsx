import { ArrowRight } from '@/components/shared/ArrowRight';
import { capture } from '@/lib/analytics';
import { getDerivedMonthly, usePricingStore } from '@/stores/pricing';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ByteDanceIcon,
  ChatGPTIcon,
  ClaudeIcon,
  DeepSeekIcon,
  GeminiIcon,
  GrokIcon,
  MetaIcon,
  MistralIcon,
  MoonshotIcon,
  PerplexityIcon,
  QwenIcon
} from './llm-icons';

function Stars() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="94"
        height="14"
        viewBox="0 0 94 14"
        fill="none"
      >
        <path
          d="M6.12419 0.427636C6.21635 0.295607 6.33903 0.187783 6.48179 0.113331C6.62455 0.0388788 6.78318 0 6.94419 0C7.10521 0 7.26384 0.0388788 7.4066 0.113331C7.54936 0.187783 7.67204 0.295607 7.76419 0.427636L9.5912 3.04964C9.71988 3.23402 9.90695 3.36965 10.1222 3.43464L13.1802 4.36164C13.3343 4.40844 13.4748 4.49178 13.5898 4.60456C13.7048 4.71734 13.7908 4.85622 13.8406 5.00939C13.8904 5.16256 13.9024 5.32549 13.8757 5.48432C13.849 5.64315 13.7843 5.79317 13.6872 5.92164L11.7572 8.46864C11.6216 8.64801 11.5505 8.86784 11.5552 9.09264L11.6192 12.2866C11.6223 12.4478 11.5865 12.6073 11.5147 12.7515C11.4429 12.8958 11.3372 13.0206 11.2068 13.1153C11.0764 13.21 10.925 13.2717 10.7656 13.2953C10.6062 13.3188 10.4434 13.3035 10.2912 13.2506L7.27319 12.2036C7.06075 12.1299 6.82964 12.1299 6.61719 12.2036L3.59819 13.2496C3.44596 13.3025 3.2832 13.3178 3.12378 13.2943C2.96435 13.2707 2.81298 13.209 2.68256 13.1143C2.55214 13.0196 2.44653 12.8948 2.37473 12.7505C2.30293 12.6063 2.26707 12.4468 2.27019 12.2856L2.33419 9.09164C2.33864 8.86672 2.26712 8.64688 2.13119 8.46764L0.202194 5.92164C0.105062 5.79311 0.0404219 5.64301 0.0137744 5.48413C-0.012873 5.32524 -0.000738446 5.16227 0.0491454 5.00908C0.0990292 4.8559 0.185185 4.71703 0.300281 4.6043C0.415377 4.49158 0.556004 4.40833 0.710194 4.36164L3.76719 3.43464C3.98208 3.36945 4.16877 3.23384 4.29719 3.04964L6.12419 0.427636ZM26.1242 0.427636C26.2164 0.295607 26.339 0.187783 26.4818 0.113331C26.6246 0.0388788 26.7832 0 26.9442 0C27.1052 0 27.2638 0.0388788 27.4066 0.113331C27.5494 0.187783 27.672 0.295607 27.7642 0.427636L29.5912 3.04964C29.7199 3.23402 29.9069 3.36965 30.1222 3.43464L33.1792 4.36164C33.3334 4.40833 33.474 4.49158 33.5891 4.6043C33.7042 4.71703 33.7904 4.8559 33.8402 5.00908C33.8901 5.16227 33.9023 5.32524 33.8756 5.48413C33.849 5.64301 33.7843 5.79311 33.6872 5.92164L31.7572 8.46864C31.6216 8.64801 31.5505 8.86784 31.5552 9.09264L31.6192 12.2866C31.6223 12.4478 31.5865 12.6073 31.5147 12.7515C31.4429 12.8958 31.3372 13.0206 31.2068 13.1153C31.0764 13.21 30.925 13.2717 30.7656 13.2953C30.6062 13.3188 30.4434 13.3035 30.2912 13.2506L27.2732 12.2036C27.0607 12.1299 26.8296 12.1299 26.6172 12.2036L23.5982 13.2496C23.446 13.3025 23.2832 13.3178 23.1238 13.2943C22.9643 13.2707 22.813 13.209 22.6826 13.1143C22.5521 13.0196 22.4465 12.8948 22.3747 12.7505C22.3029 12.6063 22.2671 12.4468 22.2702 12.2856L22.3342 9.09164C22.3386 8.86672 22.2671 8.64688 22.1312 8.46764L20.2022 5.92064C20.1051 5.79211 20.0404 5.64201 20.0138 5.48313C19.9871 5.32424 19.9993 5.16127 20.0491 5.00808C20.099 4.8549 20.1852 4.71603 20.3003 4.6033C20.4154 4.49058 20.556 4.40733 20.7102 4.36064L23.7672 3.43364C23.9821 3.36845 24.1688 3.23284 24.2972 3.04864L26.1232 0.426637L26.1242 0.427636ZM46.1242 0.427636C46.2164 0.295607 46.339 0.187783 46.4818 0.113331C46.6246 0.0388788 46.7832 0 46.9442 0C47.1052 0 47.2638 0.0388788 47.4066 0.113331C47.5494 0.187783 47.672 0.295607 47.7642 0.427636L49.5922 3.04964C49.7206 3.23384 49.9073 3.36945 50.1222 3.43464L53.1792 4.36164C53.3334 4.40833 53.474 4.49158 53.5891 4.6043C53.7042 4.71703 53.7904 4.8559 53.8402 5.00908C53.8901 5.16227 53.9023 5.32524 53.8756 5.48413C53.849 5.64301 53.7843 5.79311 53.6872 5.92164L51.7572 8.46864C51.6216 8.64801 51.5505 8.86784 51.5552 9.09264L51.6192 12.2866C51.6223 12.4478 51.5865 12.6073 51.5147 12.7515C51.4429 12.8958 51.3372 13.0206 51.2068 13.1153C51.0764 13.21 50.925 13.2717 50.7656 13.2953C50.6062 13.3188 50.4434 13.3035 50.2912 13.2506L47.2732 12.2036C47.0607 12.1299 46.8296 12.1299 46.6172 12.2036L43.5982 13.2496C43.446 13.3025 43.2832 13.3178 43.1238 13.2943C42.9643 13.2707 42.813 13.209 42.6826 13.1143C42.5521 13.0196 42.4465 12.8948 42.3747 12.7505C42.3029 12.6063 42.2671 12.4468 42.2702 12.2856L42.3342 9.09164C42.3386 8.86672 42.2671 8.64688 42.1312 8.46764L40.2022 5.92064C40.1051 5.79211 40.0404 5.64201 40.0138 5.48313C39.9871 5.32424 39.9993 5.16127 40.0491 5.00808C40.099 4.8549 40.1852 4.71603 40.3003 4.6033C40.4154 4.49058 40.556 4.40733 40.7102 4.36064L43.7672 3.43364C43.9821 3.36845 44.1688 3.23284 44.2972 3.04864L46.1232 0.426637L46.1242 0.427636ZM66.1242 0.427636C66.2163 0.295607 66.339 0.187783 66.4818 0.113331C66.6245 0.0388788 66.7832 0 66.9442 0C67.1052 0 67.2638 0.0388788 67.4066 0.113331C67.5494 0.187783 67.672 0.295607 67.7642 0.427636L69.5922 3.04964C69.7206 3.23384 69.9073 3.36945 70.1222 3.43464L73.1792 4.36164C73.3334 4.40833 73.474 4.49158 73.5891 4.6043C73.7042 4.71703 73.7904 4.8559 73.8402 5.00908C73.8901 5.16227 73.9023 5.32524 73.8756 5.48413C73.849 5.64301 73.7843 5.79311 73.6872 5.92164L71.7572 8.46864C71.6216 8.64801 71.5505 8.86784 71.5552 9.09264L71.6192 12.2866C71.6223 12.4478 71.5864 12.6073 71.5146 12.7515C71.4428 12.8958 71.3372 13.0206 71.2068 13.1153C71.0764 13.21 70.925 13.2717 70.7656 13.2953C70.6062 13.3188 70.4434 13.3035 70.2912 13.2506L67.2732 12.2036C67.0607 12.1299 66.8296 12.1299 66.6172 12.2036L63.5982 13.2496C63.446 13.3025 63.2832 13.3178 63.1238 13.2943C62.9643 13.2707 62.813 13.209 62.6826 13.1143C62.5521 13.0196 62.4465 12.8948 62.3747 12.7505C62.3029 12.6063 62.2671 12.4468 62.2702 12.2856L62.3342 9.09164C62.3386 8.86672 62.2671 8.64688 62.1312 8.46764L60.2022 5.92064C60.1051 5.79211 60.0404 5.64201 60.0138 5.48313C59.9871 5.32424 59.9993 5.16127 60.0491 5.00808C60.099 4.8549 60.1852 4.71603 60.3003 4.6033C60.4154 4.49058 60.556 4.40733 60.7102 4.36064L63.7672 3.43364C63.9821 3.36845 64.1688 3.23284 64.2972 3.04864L66.1232 0.426637L66.1242 0.427636ZM86.1242 0.427636C86.2163 0.295607 86.339 0.187783 86.4818 0.113331C86.6245 0.0388788 86.7832 0 86.9442 0C87.1052 0 87.2638 0.0388788 87.4066 0.113331C87.5494 0.187783 87.672 0.295607 87.7642 0.427636L89.5922 3.04964C89.7206 3.23384 89.9073 3.36945 90.1222 3.43464L93.1792 4.36164C93.3334 4.40833 93.474 4.49158 93.5891 4.6043C93.7042 4.71703 93.7904 4.8559 93.8402 5.00908C93.8901 5.16227 93.9023 5.32524 93.8756 5.48413C93.849 5.64301 93.7843 5.79311 93.6872 5.92164L91.7572 8.46864C91.6216 8.64801 91.5505 8.86784 91.5552 9.09264L91.6192 12.2866C91.6223 12.4478 91.5864 12.6073 91.5146 12.7515C91.4428 12.8958 91.3372 13.0206 91.2068 13.1153C91.0764 13.21 90.925 13.2717 90.7656 13.2953C90.6062 13.3188 90.4434 13.3035 90.2912 13.2506L87.2732 12.2036C87.0607 12.1299 86.8296 12.1299 86.6172 12.2036L83.5982 13.2496C83.446 13.3025 83.2832 13.3178 83.1238 13.2943C82.9643 13.2707 82.813 13.209 82.6826 13.1143C82.5521 13.0196 82.4465 12.8948 82.3747 12.7505C82.3029 12.6063 82.2671 12.4468 82.2702 12.2856L82.3342 9.09164C82.3386 8.86672 82.2671 8.64688 82.1312 8.46764L80.2022 5.92064C80.1051 5.79211 80.0404 5.64201 80.0138 5.48313C79.9871 5.32424 79.9993 5.16127 80.0491 5.00808C80.099 4.8549 80.1852 4.71603 80.3003 4.6033C80.4154 4.49058 80.556 4.40733 80.7102 4.36064L83.7672 3.43364C83.9821 3.36845 84.1688 3.23284 84.2972 3.04864L86.1232 0.426637L86.1242 0.427636Z"
          fill="#E6B919"
        />
      </svg>
    </span>
  );
}

function GreenCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M1.24733 5.48035C1.01115 5.48103 0.779975 5.55029 0.580562 5.68012C0.381149 5.80995 0.221644 5.99505 0.1205 6.21399C0.0193555 6.43294 -0.0192938 6.67678 0.00902314 6.91732C0.03734 7.15786 0.131466 7.38526 0.280511 7.57321L3.4578 11.5659C3.57109 11.7102 3.71631 11.8247 3.88139 11.8999C4.04647 11.975 4.22665 12.0087 4.40697 11.9981C4.79262 11.9768 5.1408 11.7652 5.36279 11.4172L11.9628 0.513395C11.9639 0.511587 11.965 0.509778 11.9662 0.507996C12.0281 0.410456 12.008 0.217158 11.8802 0.0957254C11.8451 0.0623786 11.8037 0.036759 11.7586 0.0204444C11.7135 0.0041297 11.6655 -0.0025346 11.6178 0.000862027C11.5701 0.00425866 11.5235 0.0176443 11.481 0.0401944C11.4385 0.0627446 11.401 0.0939818 11.3707 0.131982C11.3683 0.13497 11.3659 0.137913 11.3634 0.14081L4.70712 7.85557C4.68179 7.88493 4.65103 7.90883 4.61662 7.92589C4.58221 7.94295 4.54484 7.95282 4.50668 7.95494C4.46852 7.95706 4.43033 7.95137 4.39432 7.93822C4.35832 7.92507 4.32523 7.90471 4.29696 7.87833L2.08788 5.81614C1.85845 5.60039 1.55858 5.48059 1.24733 5.48035Z"
        fill="url(#paint0_linear_1_60828)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_60828"
          x1="11.522"
          y1="2.15719"
          x2="0.477974"
          y2="2.15719"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#39D47A" />
          <stop offset="1" stop-color="#009CD0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const country = usePricingStore((s) => s.country);
  const monthlyFromYearly = getDerivedMonthly(country);

  return (
    <section className="relative overflow-hidden pb-10 pt-32">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: 'var(--hero-bg-image)'
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 text-center">
        {/* Badges */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="border-top-effect flex items-center gap-2 rounded-pill px-4 py-2 text-sm text-foreground">
            <img
              src="/images/y-icon.avif"
              alt=""
              width="18"
              height="18"
              className="h-[18px] w-[18px] rounded-full"
            />
            {t('hero.ycBadge')}
          </div>
          <div className="border-top-effect flex items-center gap-2 rounded-pill px-4 py-2 text-sm text-foreground">
            <img
              src="/images/live-badge.png"
              alt=""
              width="34"
              height="18"
              className="h-[18px] w-auto"
            />
            {t('hero.liveBadge')}
          </div>
        </div>

        <h1 className="font-heading text-[44px] font-bold leading-[1.1] text-foreground xs:text-[56px] sm:text-[72px]">
          {t('hero.titleLine1')}{' '}
          <span className="brand-gradient-text">{t('hero.titleLine2')}</span>
        </h1>

        <p className="mx-auto mt-2 max-w-[720px] text-base text-muted-foreground sm:text-lg">
          {t('hero.subtitle')}
        </p>

        {/* Trust chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground">
          <span className="flex items-center gap-2">
            <Stars />
            <span className="text-muted-foreground">
              {t('hero.trustedBy')}
            </span>{' '}
            <strong>{t('hero.trustedUsers')}</strong>
          </span>
          <span className="hidden h-6 w-px bg-[linear-gradient(180deg,rgba(186,186,186,0.00)_0%,#BABABA_50%,rgba(186,186,186,0.00)_100%)] sm:inline-block" />
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustModels')}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustCancel')}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <GreenCheck /> <strong>{t('hero.trustUpi')}</strong>
          </span>
        </div>

        {/* Hero visual */}
        <img
          src="/images/banner-llms.avif"
          alt="AI Fiesta connects ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Grok and more"
          width="1536"
          height="528"
          fetchPriority="high"
          decoding="async"
          className="mx-auto mt-8 hidden w-full max-w-[1100px] sm:block"
        />
        <div className="mt-8 sm:hidden">
          <MobileHeroOrbit />
        </div>

        <a
          href="#pricing"
          onClick={() => capture('cta_clicked', { location: 'hero' })}
          className="btn-pill mt-2 px-8 text-lg"
        >
          {t('hero.ctaPrefix')} {monthlyFromYearly}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

function MobileHeroOrbit() {
  // 5 chip positions over the platter shadows (% of container)
  // Each slot has its own cycling interval + start offset for staggered swaps
  const slots: { x: number; y: number; interval: number; offset: number }[] = [
    { x: 13, y: 55, interval: 1800, offset: 0 }, // outer ring — left
    { x: 31, y: 66, interval: 2200, offset: 400 }, // outer ring — right
    { x: 50, y: 71, interval: 1600, offset: 800 }, // middle ring — front-left
    { x: 69, y: 66, interval: 1700, offset: 1100 }, // middle ring — front-right
    { x: 87, y: 55, interval: 2000, offset: 200 } // inner ring — front-center
  ];
  const pool = [
    ChatGPTIcon,
    ClaudeIcon,
    GeminiIcon,
    DeepSeekIcon,
    PerplexityIcon,
    GrokIcon,
    MetaIcon,
    QwenIcon,
    MoonshotIcon,
    MistralIcon,
    ByteDanceIcon
  ];
  const [ticks, setTicks] = useState<number[]>(() => slots.map((_, i) => i));
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    slots.forEach((s, i) => {
      timeouts.push(
        setTimeout(() => {
          intervals.push(
            setInterval(() => {
              setTicks((prev) => {
                const next = [...prev];
                next[i] = next[i] + 1;
                return next;
              });
            }, s.interval)
          );
        }, s.offset)
      );
    });
    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="relative mx-auto w-full md:max-w-[420px]"
      style={{ aspectRatio: '1300 / 800' }}
    >
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        />
        <source
          media="(prefers-color-scheme: light)"
          srcSet={'/images/mobile-banner-llm.avif'}
        />
        <img
          src={'/images/mobile-banner-llm.avif'}
          alt="AI Fiesta platter with central logo"
          className="absolute inset-0 h-full w-full object-contain"
          width="1308"
          height="792"
          loading="eager"
          decoding="async"
        />
      </picture>
      {slots.map((s, i) => {
        const Icon = pool[(i * 2 + ticks[i]) % pool.length];
        const size = 55;
        return (
          <div
            key={i}
            className="mobile-orbit-icon-circle absolute flex items-center justify-center rounded-full transition-opacity duration-500"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: size,
              height: size,
              transform: 'translate(-50%, -50%)',
              zIndex: 10
            }}
          >
            <Icon className="size-7" />
          </div>
        );
      })}
    </div>
  );
}
