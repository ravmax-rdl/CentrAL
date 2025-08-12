import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Environment configuration
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://studyatcentral.com';

const isPreview = process.env.VERCEL_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: isPreview ? 'centrAL (Preview)' : 'centrAL',
    template: isPreview ? '%s | centrAL (Preview)' : '%s | centrAL',
  },
  description:
    'centrAL is a collaborative learning platform designed specifically for Sri Lankan G.C.E A/L students. Access comprehensive study resources, connect with peers, and excel in your Advanced Level examinations.',
  keywords: [
    'education',
    'learning',
    'sri lanka',
    'students',
    'a/l',
    'advanced level',
    'resources',
    'collaboration',
    'community',
    'forum',
    'study',
    'notes',
    'past papers',
    'quizzes',
    'exam',
    'revision',
    'mathematics',
    'physics',
    'chemistry',
    'biology',
    'online learning',
    'peer learning',
  ],
  authors: [{ name: 'centrAL Team' }],
  creator: 'centrAL',
  publisher: 'centrAL',
  category: 'education',
  classification: 'Education Technology',
  applicationName: 'centrAL',
  generator: 'Next.js',
  openGraph: {
    title: isPreview ? 'centrAL (Preview)' : 'centrAL',
    description: 'A collaborative learning platform for Sri Lankan G.C.E A/L students.',
    url: 'https://studyatcentral.com/',
    siteName: 'centrAL',
    images: [
      {
        url: `/images/banner.png`,
        width: 1200,
        height: 630,
        alt: 'centrAL - Where ambition meets access. A collaborative learning platform for Sri Lankan A/L students.',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
    countryName: 'Sri Lanka',
  },
  twitter: {
    card: 'summary_large_image',
    title: isPreview ? 'centrAL (Preview)' : 'centrAL',
    description: 'A collaborative learning platform for Sri Lankan G.C.E A/L students.',
    images: ['/images/banner.png'],
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
    noarchive: isPreview,
    nosnippet: isPreview,
    noimageindex: isPreview,
    nocache: isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
      noimageindex: isPreview,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
  alternates: {
    canonical: 'https://studyatcentral.com',
    languages: {
      'en-US': 'https://studyatcentral.com',
      'si-LK': 'https://studyatcentral.com/si',
      'ta-LK': 'https://studyatcentral.com/ta',
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
};

// Add viewport export for better mobile optimization
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Optimized font loading with preload and display swap
const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  preload: false, // Only preload critical fonts
  fallback: ['serif'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/images/logowhite.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logowhite.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      </head>
      <body
        className={`${inter.className} ${instrumentSerif.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="central-theme"
          themes={['light', 'dark', 'system']}
        >
          <div id="root-content" className="relative">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
