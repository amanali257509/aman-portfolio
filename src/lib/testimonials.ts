export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company?: string
  source?: 'Fiverr' | 'Upwork' | 'Direct' | string
  avatar?: string
}

/**
 * STRICT RULE: Only verified testimonials go here.
 * If this array is empty, the Testimonials section will automatically NOT render.
 * Aman Ali can paste real client reviews here whenever ready.
 *
 * Example:
 * {
 *   id: '1',
 *   quote: 'Aman delivered an exceptional Shopify store on time with insane performance score!',
 *   name: 'John Doe',
 *   role: 'Founder',
 *   company: 'Ecom Brand Inc.',
 *   source: 'Fiverr',
 * }
 */
export const testimonials: Testimonial[] = []
