export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  stack: string[]
}

export const services: ServiceItem[] = [
  {
    id: 'wordpress-woocommerce',
    number: '01',
    title: 'WordPress and WooCommerce',
    description:
      'I build custom WordPress themes, ACF Pro flexible blocks and complete WooCommerce online stores.',
    stack: ['WordPress', 'WooCommerce', 'ACF Pro', 'Gutenberg', 'Elementor', 'Kadence', 'Divi'],
  },
  {
    id: 'shopify-liquid',
    number: '02',
    title: 'Shopify and Liquid',
    description:
      'I develop custom Shopify themes with clean Liquid code, store setup, payments and shipping configuration.',
    stack: ['Shopify', 'Liquid', 'Store Setup', 'Checkout', 'AJAX Cart'],
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI automation',
    description:
      'I connect apps and build automated workflows using n8n, Zapier, webhooks and the OpenAI API.',
    stack: ['n8n', 'Zapier', 'OpenAI API', 'Webhooks', 'REST APIs', 'Chatbots'],
  },
  {
    id: 'full-stack',
    number: '04',
    title: 'Full stack development',
    description:
      'I build web applications with React, Next.js, TypeScript, custom backend logic and MySQL databases.',
    stack: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'PHP', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 'webflow-wix-cms',
    number: '05',
    title: 'Webflow, Wix and other CMS',
    description:
      'I create responsive websites and landing pages on Webflow, Wix, Squarespace and GoHighLevel.',
    stack: ['Webflow', 'Wix', 'Squarespace', 'GoHighLevel'],
  },
  {
    id: 'ecommerce-operations-seo',
    number: '06',
    title: 'E-commerce operations and SEO',
    description:
      'I manage product catalogs, fix technical and on-page SEO, speed up sites and support digital marketing.',
    stack: ['Catalog Management', 'Technical SEO', 'Site Speed', 'Meta Ads', 'Influencer Marketing'],
  },
]
