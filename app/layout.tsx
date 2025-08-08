import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://studyatcentral.com';

// Detect if this is a preview deployment
const isPreview = process.env.VERCEL_ENV === 'preview';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'centrAL',
  description: 'centrAL is collaborative learning platform for Sri Lankan G.C.E A/L students.',
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
  ],
  authors: [{ name: 'centrAL Team' }],
  creator: 'centrAL',
  publisher: 'centrAL',
  openGraph: {
    title: isPreview ? 'centrAL (Preview)' : 'centrAL',
    description: 'centrAL is collaborative learning platform for Sri Lankan G.C.E A/L students.',
    url: defaultUrl,
    siteName: 'centrAL',
    images: [
      {
        url: '/images/banner.png',
        width: 1200,
        height: 630,
        alt: 'centrAL - Where ambition meets access',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: !isPreview, // Don't index preview deployments
    follow: !isPreview,
    nocache: isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
      noimageindex: isPreview,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${instrumentSerif.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={true}
          storageKey="central-theme"
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
