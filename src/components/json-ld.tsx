import { personalDetails } from '@/data/content'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalDetails.name,
    jobTitle: personalDetails.headline,
    description: personalDetails.tagline,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aman-ali.vercel.app',
    email: personalDetails.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'Pakistan',
    },
    sameAs: [
      personalDetails.links.github,
      personalDetails.links.linkedin,
      personalDetails.links.fiverr,
    ],
    knowsAbout: [
      'AI Automation',
      'n8n',
      'Zapier',
      'OpenAI API',
      'Next.js',
      'React',
      'TypeScript',
      'Shopify Liquid',
      'WordPress & WooCommerce',
      'E-commerce Operations',
      'Technical SEO',
      'API Integration',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
