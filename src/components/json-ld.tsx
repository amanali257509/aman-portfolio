import { profile } from '@/data/profile'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: `${profile.title} | ${profile.subtitle}`,
    description: profile.hero.paragraph,
    url: 'https://aman-ali.vercel.app',
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'Pakistan',
    },
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.upwork,
    ],
    knowsAbout: [
      'WordPress',
      'Shopify',
      'Shopify Liquid',
      'WooCommerce',
      'AI Automation',
      'n8n',
      'Zapier',
      'OpenAI API',
      'Next.js',
      'React',
      'TypeScript',
      'PHP',
      'MySQL',
      'Webflow',
      'Wix',
      'Technical SEO',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
