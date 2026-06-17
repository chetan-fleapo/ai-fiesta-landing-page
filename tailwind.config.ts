import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // Webflow breakpoints used by the original site (mobile-first)
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1280px',
      xl: '1440px',
      '2xl': '1920px'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        sora: ['Sora', 'system-ui', 'sans-serif']
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        'border-strong': 'hsl(var(--border-strong))',
        accent: {
          DEFAULT: '#30a46c',
          green: '#39d47a',
          blue: '#009cd0',
          bright: '#00ff99',
          particle: '#9affc4'
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(315deg, #39d47a 0%, #009cd0 100%)',
        'brand-gradient-text':
          'linear-gradient(270deg, #39d47a 3.98%, #009cd0 96.02%)',
        'brand-gradient-soft':
          'linear-gradient(315deg, rgba(57, 212, 122, 0.08) 0%, rgba(0, 156, 208, 0.08) 100%)'
      },
      boxShadow: {
        'btn-pill':
          'inset 0 0 0 1px #00002d17, inset 0 -2px 1px #0000330f, inset 0 0 0 1px #30a46c, inset 0 4px 2px -2px #ffffffb3, inset 0 2px 1px -1px #ffffffb3',
        'btn-outline':
          '0 4px 15px 2px rgba(57, 212, 122, 0.1), inset 0 0 0 1px #30a46c'
      },
      borderRadius: {
        pill: '99px'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        shake: 'shake 0.3s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [animate]
} satisfies Config;
