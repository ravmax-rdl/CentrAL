import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'instrument-serif': [
          'var(--font-instrument-serif)',
          'Instrument Serif',
          'ui-serif',
          'Georgia',
          'serif',
        ],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // Custom backdrop colors
        backdrop: {
          light: 'rgba(var(--backdrop-light), var(--backdrop-opacity))',
          dark: 'rgba(var(--backdrop-dark), var(--backdrop-opacity))',
        },
        // Border animation colors
        'border-animation': {
          light: 'rgba(var(--border-animation-light), var(--border-animation-opacity))',
          dark: 'rgba(var(--border-animation-dark), var(--border-animation-opacity))',
        },
        // White overlay colors
        'white-overlay': {
          low: 'rgba(var(--white-overlay-low), var(--white-overlay-low-opacity))',
          medium: 'rgba(var(--white-overlay-medium), var(--white-overlay-medium-opacity))',
        },
        // Cyan gradient
        'cyan-gradient': {
          DEFAULT: 'rgb(var(--cyan-gradient))',
          transparent: 'rgba(var(--cyan-gradient), var(--cyan-gradient-opacity))',
        },
        // Transparent
        'transparent-outline':
          'rgba(var(--transparent-outline), var(--transparent-outline-opacity))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
