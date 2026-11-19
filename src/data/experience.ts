export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export const experiences: ExperienceItem[] = [
  {
    role: 'AI Automation & Full Stack Engineer | E-commerce Technology Lead',
    company: 'Zyne Ventures (software company with a US branch)',
    location: 'Karachi, Pakistan',
    period: 'May 2024 to Present',
    bullets: [
      'Build AI workflows and API integrations with n8n, Zapier and OpenAI to automate orders, customer support and daily operations.',
      'Develop websites and web applications with React, Next.js, custom backend logic and databases; handle DNS and deployments using GitHub and Vercel.',
      'Build custom Shopify (Liquid) and WordPress websites from requirements to launch.',
      "Manage end-to-end e-commerce operations for Snug N' Play, a kids' toys brand: online store, products, SEO, website performance, influencer collaborations and digital marketing.",
      'Manage projects and coordinate clients, designers, sales and developers to deliver on time.',
      'Use AI tools (OpenAI, Claude, Gemini, Cursor) to speed up development, debugging and automation.',
    ],
  },
  {
    role: 'Senior Web Developer',
    company: 'Sleek Hive',
    location: 'Karachi, Pakistan',
    period: 'Nov 2022 to Apr 2024',
    bullets: [
      'Managed and delivered WordPress, WooCommerce and Shopify projects for business clients, from requirements to launch.',
      'Built complete e-commerce websites, including store setup, product catalog, and payment and shipping configuration.',
      'Developed custom WordPress themes and Shopify stores with custom Liquid code.',
      'Handled cPanel, server setup, and website and server migrations; used Git and GitHub for version control.',
      'Created UI/UX designs in Figma, Adobe XD, Photoshop and Illustrator, and converted client designs into responsive websites.',
      'Managed client communication and delivery timelines independently.',
    ],
  },
  {
    role: 'Frontend Developer (promoted from Web Development Intern)',
    company: 'Valscode',
    location: 'Karachi, Pakistan',
    period: 'Nov 2020 to Nov 2022',
    bullets: [
      'Built and customized websites on WordPress, Shopify (including custom Liquid), Wix, Squarespace, Webflow and GoHighLevel.',
      'Developed responsive pages and components with HTML5, CSS3, JavaScript and Bootstrap.',
      'Set up WooCommerce and Shopify stores and improved on-page SEO.',
      'Handled bug fixes, client revisions and staging-to-production deployments independently.',
      'Began freelancing with personal clients on freelance platforms alongside the job.',
    ],
  },
]
