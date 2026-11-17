export type ProjectCategory = 'WordPress' | 'Shopify' | 'Webflow' | 'Wix' | 'AI Automation'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  result: string
  tech: string[]
  image: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'acf-custom-portal',
    title: 'Bespoke ACF Pro & WooCommerce Architecture',
    category: 'WordPress',
    description:
      'Custom WordPress theme engineered with Advanced Custom Fields (ACF Pro) flexible content blocks and tailored WooCommerce checkout.',
    result: '+45% faster page load and seamless content management for marketing team.',
    tech: ['WordPress', 'ACF Pro', 'WooCommerce', 'PHP', 'Tailwind'],
    image: '/projects/acf-12.png',
    liveUrl: 'https://blackbuckdesigns.com',
  },
  {
    id: 'shopify-fashion-store',
    title: 'High-Converting Shopify Liquid Storefront',
    category: 'Shopify',
    description:
      'Custom Liquid theme developed with zero bloated third-party apps, featuring dynamic cart drawers and instant product variant pickers.',
    result: 'Mobile load time cut by 55%, conversion rate increased by +28%.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS3', 'CRO'],
    image: '/projects/shopify-1.png',
    liveUrl: 'https://keeps.pk',
  },
  {
    id: 'ai-n8n-automation',
    title: 'Autonomous Multi-Channel Inventory & Order Sync',
    category: 'AI Automation',
    description:
      'Event-driven n8n automation pipeline integrating Shopify webhooks, OpenAI API for anomaly detection, and Slack notifications.',
    result: 'Eliminated 15+ hours/week of manual order processing with 99.9% uptime.',
    tech: ['n8n', 'OpenAI API', 'Webhooks', 'REST APIs', 'Node.js'],
    image: '/projects/screencapture-creativefinancegames-2024-10-17-02_57_00_copy.webp',
  },
  {
    id: 'webflow-saas-landing',
    title: 'Interactive Webflow SaaS Platform',
    category: 'Webflow',
    description:
      'Clean, responsive Webflow build with custom interactions, CMS collections, and high-converting lead generation funnels.',
    result: 'Sub-second rendering and 98% Google PageSpeed mobile score.',
    tech: ['Webflow', 'Webflow CMS', 'Custom JavaScript', 'Animations'],
    image: '/projects/webflow-10.png',
    liveUrl: 'https://mydesignbuddy.co.uk',
  },
  {
    id: 'wix-brand-experience',
    title: 'Custom Wix Studio Business Hub',
    category: 'Wix',
    description:
      'Custom responsive design built with Wix Studio, custom Velo code interactions, and structured booking/inquiry workflows.',
    result: 'Doubled client inquiries within first 30 days of launch.',
    tech: ['Wix Studio', 'Velo', 'Responsive Design', 'SEO'],
    image: '/projects/wix-device11.png',
  },
  {
    id: 'brand-wp-portal',
    title: 'Enterprise WordPress & Elementor Showcase',
    category: 'WordPress',
    description:
      'High-performance corporate WordPress platform with pixel-perfect responsive styling, on-page SEO, and custom post types.',
    result: 'Ranked top 3 for targeted commercial keywords with 100% Core Web Vitals pass.',
    tech: ['WordPress', 'Elementor', 'PHP', 'Technical SEO'],
    image: '/projects/brand-wp.png',
  },
  {
    id: 'shopify-medshop',
    title: 'Shopify Theme Customization & Speed Optimization',
    category: 'Shopify',
    description:
      'Custom Liquid code refactoring, image compression, and script deferral for a high-traffic health & wellness e-commerce store.',
    result: 'Score increased from 34 to 91 on Google Mobile PageSpeed.',
    tech: ['Shopify Liquid', 'Core Web Vitals', 'JavaScript', 'Speed Optimization'],
    image: '/projects/screencapture-medshop-pk-2024-10-17-02_06_51_copy.webp',
    liveUrl: 'https://medshop.pk',
  },
  {
    id: 'wordpress-steadily',
    title: 'Responsive Custom Business Portal',
    category: 'WordPress',
    description:
      'Custom WordPress architecture with custom dynamic fields, security hardening, and fast cache configuration.',
    result: 'Page load time dropped to 0.9s across all devices.',
    tech: ['WordPress', 'ACF Pro', 'MySQL', 'cPanel', 'Speed Optimization'],
    image: '/projects/screencapture-steadily-2024-10-17-03_14_59_copy.webp',
  },
]
