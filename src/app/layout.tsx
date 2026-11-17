import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-heading',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aman-ali-dev.vercel.app'

export const viewport: Viewport = {
  themeColor: '#0b0f17',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aman Ali | WordPress & Shopify Expert | AI Automation Specialist',
    template: '%s | Aman Ali',
  },
  description:
    'Aman Ali is an expert WordPress & ACF Developer, Shopify (Liquid) Developer, and AI Automation Specialist (n8n, OpenAI) based in Karachi, Pakistan. E-commerce Technology Lead with 5+ years experience building high-converting stores and autonomous workflows.',
  keywords: [
    'Aman Ali',
    'WordPress Expert',
    'Shopify Expert',
    'ACF Developer',
    'AI Automation Engineer',
    'Pakistan',
    'Shopify Liquid Developer',
    'WordPress & ACF Expert',
    'n8n Specialist',
    'Full Stack Next.js',
    'E-commerce Technology Lead',
    'Karachi Pakistan Software Engineer',
  ],
  authors: [{ name: 'Aman Ali', url: 'https://github.com/amanali257509' }],
  creator: 'Aman Ali',
  publisher: 'Aman Ali',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aman Ali | WordPress & Shopify Expert | AI Automation Specialist',
    description:
      'WordPress & Shopify Expert | AI Automation Specialist (n8n, OpenAI). E-commerce Technology Lead with 5+ years building custom stores, workflows, and Next.js apps.',
    url: siteUrl,
    siteName: 'Aman Ali Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Ali | WordPress & Shopify Expert | AI Automation Specialist',
    description:
      'WordPress & Shopify Expert | AI Automation Specialist (n8n, OpenAI). E-commerce Technology Lead with 5+ years experience.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-[#0b0f17] text-[#f1f5f9]`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:h-[44px] focus:inline-flex focus:items-center focus:bg-[#f59e0b] focus:text-[#0b0f17] focus:font-semibold focus:rounded-[6px] focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
