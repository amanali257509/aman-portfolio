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
    default: 'Aman Ali | AI Automation & Full Stack Engineer | E-commerce Lead',
    template: '%s | Aman Ali',
  },
  description:
    'Aman Ali is an AI Automation & Full Stack Engineer and E-commerce Technology Lead based in Karachi, Pakistan. 5+ years building autonomous workflows and high-converting e-commerce systems.',
  keywords: [
    'Aman Ali',
    'AI Automation Engineer',
    'Full Stack Engineer',
    'E-commerce Technology Lead',
    'n8n Specialist',
    'Shopify Liquid Developer',
    'Next.js Developer',
    'Karachi Pakistan Software Engineer',
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
      'I build e-commerce systems and AI automations that help brands grow faster. 5+ years experience in Next.js, n8n, and Shopify.',
    url: siteUrl,
    siteName: 'Aman Ali Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Ali | AI Automation & Full Stack Engineer',
    description:
      'I build e-commerce systems and AI automations that help brands grow faster.',
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
