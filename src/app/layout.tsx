import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aman-ali-dev.vercel.app'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#080d1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aman Ali | AI Automation & Full Stack Engineer | E-commerce Lead',
    template: '%s | Aman Ali',
  },
  description:
    'Aman Ali is an AI Automation & Full Stack Engineer and E-commerce Technology Lead based in Karachi, Pakistan. 5+ years architecting autonomous n8n workflows, Next.js web applications, and high-converting Shopify systems.',
  keywords: [
    'Aman Ali',
    'AI Automation Engineer',
    'Full Stack Engineer',
    'E-commerce Technology Lead',
    'n8n Specialist',
    'Shopify Liquid Developer',
    'Next.js Developer',
    'Zapier Workflow Automation',
    'OpenAI API Integration',
    'Karachi Pakistan Software Engineer',
    'Remote Full Stack Developer',
  ],
  authors: [{ name: 'Aman Ali', url: 'https://github.com/amanali257509' }],
  creator: 'Aman Ali',
  publisher: 'Aman Ali',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aman Ali | AI Automation & Full Stack Engineer',
    description:
      'I build e-commerce systems and AI automations that help brands grow faster. 5+ years experience in Next.js, n8n, Shopify Liquid, and full-stack development.',
    url: siteUrl,
    siteName: 'Aman Ali Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Ali | AI Automation & Full Stack Engineer',
    description:
      'I build e-commerce systems and AI automations that help brands grow faster. 5+ years experience in Next.js, n8n, and Shopify.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${heading.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-navy-950 focus:font-semibold focus:rounded-xl focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
