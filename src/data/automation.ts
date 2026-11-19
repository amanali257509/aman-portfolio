// TODO: Real videos 1280x720, H.264 mp4, no audio, 5 to 8 second loop, under 3 MB each.

export interface AutomationShowcaseItem {
  id: string
  title: string
  description: string
  video: string
  poster: string
}

export const automationItems: AutomationShowcaseItem[] = [
  {
    id: 'order-sync',
    title: 'Order sync',
    description: 'New Shopify orders are checked, tagged and sent to the right place.',
    video: '/videos/ai/order-sync.mp4',
    poster: '/videos/ai/order-sync.webp',
  },
  {
    id: 'support-reply',
    title: 'Support replies',
    description: 'Customer messages get a drafted reply that I or the team can review.',
    video: '/videos/ai/support-reply.mp4',
    poster: '/videos/ai/support-reply.webp',
  },
  {
    id: 'ops-alerts',
    title: 'Operations alerts',
    description: 'Stock and order issues are posted to Slack as soon as they happen.',
    video: '/videos/ai/ops-alerts.mp4',
    poster: '/videos/ai/ops-alerts.webp',
  },
]
