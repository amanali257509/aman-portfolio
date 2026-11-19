export interface AutomationShowcaseItem {
  id: string
  title: string
  description: string
  video: string
  poster?: string
}

export const automationItems: AutomationShowcaseItem[] = [
  {
    id: 'agency-support',
    title: 'Agency support',
    description: 'Client communication and support requests routed to the right team members.',
    video: '/videos/ai/agency-support.mp4',
  },
  {
    id: 'shopify-support',
    title: 'Shopify support',
    description: 'Customer orders and support messages verified and processed automatically.',
    video: '/videos/ai/shopify-support.mp4',
  },
  {
    id: 'content-automation',
    title: 'Content automation',
    description: 'Drafting, research and publishing workflows automated with OpenAI.',
    video: '/videos/ai/content-automation.mp4',
  },
]
