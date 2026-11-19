// TODO: Real videos 1280x720, H.264 mp4, no audio, 5 to 8 second loop, under 3 MB each.

export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  poster?: string
}

export interface ProjectItem {
  slug: string
  title: string
  category: 'WordPress' | 'Shopify' | 'Webflow' | 'Wix' | 'AI Automation'
  description: string
  stack: string[]
  liveUrl: string | null
  media: ProjectMedia
}

export const projects: ProjectItem[] = [
  {
    slug: 'black-buck-designs',
    title: 'Black Buck Designs',
    category: 'WordPress',
    description:
      'Custom WordPress theme built with ACF Pro flexible content blocks and a customised WooCommerce checkout.',
    stack: ['WordPress', 'ACF Pro', 'WooCommerce', 'PHP'],
    liveUrl: 'https://blackbuckdesigns.com',
    media: {
      type: 'image',
      src: '/projects/acf-12.png',
    },
  },
  {
    slug: 'keeps-pk',
    title: 'Keeps.pk',
    category: 'Shopify',
    description:
      'Custom Shopify Liquid theme with an AJAX cart drawer and a variant picker, built without extra apps.',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    liveUrl: 'https://keeps.pk',
    media: {
      type: 'image',
      src: '/projects/shopify-1.png',
    },
  },
  {
    slug: 'medshop-pk',
    title: 'Medshop.pk',
    category: 'Shopify',
    description:
      'Speed work on an existing store: Liquid code cleanup, image compression and deferred scripts.',
    stack: ['Shopify Liquid', 'JavaScript', 'Core Web Vitals'],
    liveUrl: 'https://medshop.pk',
    media: {
      type: 'image',
      src: '/projects/medshop.png',
    },
  },
  {
    slug: 'my-design-buddy',
    title: 'My Design Buddy',
    category: 'Webflow',
    description:
      'Responsive Webflow site with CMS collections, custom interactions and a lead form.',
    stack: ['Webflow', 'CMS', 'Custom JavaScript'],
    liveUrl: 'https://mydesignbuddy.co.uk',
    media: {
      type: 'image',
      src: '/projects/webflow-10.png',
    },
  },
  {
    slug: 'order-and-support-automation',
    title: 'Order and support automation',
    category: 'AI Automation',
    description:
      'An n8n workflow that takes new Shopify orders, checks them with OpenAI and posts updates to Slack.',
    stack: ['n8n', 'OpenAI API', 'Webhooks', 'Slack'],
    liveUrl: null,
    media: {
      type: 'video',
      src: '/videos/projects/order-automation.mp4',
      poster: '/videos/projects/order-automation.webp',
    },
  },
  {
    slug: 'wix-studio-business-site',
    title: 'Wix Studio business site',
    category: 'Wix',
    description:
      'Responsive business site built on Wix Studio with a clear inquiry flow.',
    stack: ['Wix Studio', 'Responsive Design', 'SEO'],
    liveUrl: null,
    media: {
      type: 'video',
      src: '/videos/projects/wix-business.mp4',
      poster: '/videos/projects/wix-business.webp',
    },
  },
]
