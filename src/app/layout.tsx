import type { Metadata, Viewport } from 'next'
import { Urbanist, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { JsonLd } from '@/components/json-ld'
import LiquidBackground from '@/components/LiquidBackground'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

const siteUrl = 'https://aman-ali.vercel.app'

export const viewport: Viewport = {
  themeColor: '#0f1410',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aman Ali | WordPress & Shopify Expert | AI Automation Specialist',
  description:
    "I'm a web developer from Karachi with 5+ years of experience in e-commerce, WordPress and Shopify. I also build workflows with n8n, Zapier and OpenAI to automate orders, support and daily operations. Open to remote work worldwide.",
  keywords: [
    'Aman Ali',
    'WordPress Developer',
    'Shopify Expert',
    'Shopify Liquid Developer',
    'AI Automation Specialist',
    'n8n Developer',
    'Zapier Specialist',
    'WooCommerce Expert',
    'Full Stack Developer Karachi',
    'Remote Web Developer',
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
      "I'm a web developer from Karachi with 5+ years of experience in e-commerce, WordPress and Shopify. I also build workflows with n8n, Zapier and OpenAI to automate orders, support and daily operations.",
    url: siteUrl,
    siteName: 'Aman Ali Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Ali | WordPress & Shopify Expert | AI Automation Specialist',
    description:
      "I'm a web developer from Karachi with 5+ years of experience in e-commerce, WordPress and Shopify. I also build workflows with n8n, Zapier and OpenAI to automate orders, support and daily operations.",
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
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${urbanist.variable} ${poppins.variable} font-sans antialiased bg-canvas text-ink relative min-h-screen`}>
        {/* Global WebGL Liquid Ink Marbling Background */}
        <LiquidBackground />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-brass focus:text-canvas focus:font-semibold focus:rounded-[8px] focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="relative z-10 overflow-x-clip">
          {children}
        </main>
        <Footer />
        {/* Floating WhatsApp Support Button */}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
