import {
  PersonalDetails,
  ExperienceItem,
  EducationItem,
  ServiceItem,
  SkillCategory,
  ProjectItem,
  TestimonialItem,
  MetricItem,
} from '@/types'

export const personalDetails: PersonalDetails = {
  name: 'Aman Ali',
  location: 'Karachi, Pakistan',
  timezone: 'UTC+5 (PKT)',
  headline: 'WordPress & Shopify Expert | AI Automation Specialist',
  tagline: 'E-commerce Technology Lead with 5+ years building high-converting WordPress & Shopify stores, autonomous AI workflows, and modern Next.js web applications.',
  availability: 'Open to remote full-time roles, contracts & freelance projects worldwide',
  yearsOfExperience: '5+',
  email: 'amanali257509@gmail.com',
  links: {
    github: 'https://github.com/amanali257509',
    linkedin: 'https://www.linkedin.com/in/aman-ali-dev/',
    fiverr: 'https://www.fiverr.com/sellers/amanali414/',
  },
}

export const services: ServiceItem[] = [
  {
    id: 'wordpress-acf',
    title: 'WordPress & ACF Development',
    shortDescription: 'Custom themes, ACF Pro flexible blocks, and WooCommerce architectures.',
    description:
      'Engineering bespoke WordPress themes and WooCommerce stores from scratch. Deep mastery of Advanced Custom Fields (ACF Pro), custom post types, Gutenberg blocks, and PHP plugin logic for unmatched flexibility.',
    tags: ['WordPress', 'ACF Pro', 'WooCommerce', 'PHP', 'Custom Themes', 'Gutenberg'],
    icon: 'Globe',
    highlight: true,
  },
  {
    id: 'shopify-liquid',
    title: 'Shopify & Liquid Development',
    shortDescription: 'High-converting custom Shopify Liquid storefronts & app integrations.',
    description:
      'Developing lightweight custom Shopify Liquid themes (Online Store 2.0) with zero app bloat, dynamic AJAX cart drawers, custom sections, and high-conversion checkout flows.',
    tags: ['Shopify', 'Liquid', 'Theme 2.0', 'Custom Sections', 'Speed Optimization', 'CRO'],
    icon: 'ShoppingBag',
    highlight: true,
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Workflows',
    shortDescription: 'Autonomous n8n workflows, OpenAI API agents, and webhooks integration.',
    description:
      'Designing robust autonomous workflows using n8n and Zapier, integrating OpenAI API, webhooks, and REST APIs to eliminate manual work and streamline business operations.',
    tags: ['n8n', 'Zapier', 'OpenAI API', 'Webhooks', 'REST APIs', 'Prompt Engineering'],
    icon: 'Bot',
    highlight: true,
  },
  {
    id: 'webflow-wix',
    title: 'Webflow & Wix Development',
    shortDescription: 'Responsive, interactive websites with custom CMS and animations.',
    description:
      'Building clean, animated, responsive marketing sites on Webflow and Wix Studio. Implementing custom CMS structures, interactions, custom JavaScript embeds, and client-friendly setups.',
    tags: ['Webflow', 'Wix Studio', 'Webflow CMS', 'Velo', 'Responsive Design'],
    icon: 'Layout',
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development (Next.js)',
    shortDescription: 'Modern, high-performance web applications built for scale.',
    description:
      'Engineering performant, responsive web applications using React, Next.js App Router, modern TypeScript, custom backend APIs, PHP, and MySQL with rock-solid architecture.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    icon: 'Code2',
  },
  {
    id: 'ecommerce-operations',
    title: 'E-commerce Operations & SEO',
    shortDescription: 'Store optimization, Core Web Vitals, and technical SEO.',
    description:
      'End-to-end store operations: product catalog management, Core Web Vitals optimization, on-page & technical SEO, schema markup, and performance tuning for maximum search visibility.',
    tags: ['Technical SEO', 'Core Web Vitals', 'Performance', 'Catalog Management', 'Analytics'],
    icon: 'TrendingUp',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    category: 'AI & Automation',
    icon: 'Cpu',
    skills: [
      'n8n',
      'Zapier',
      'Workflow Automation',
      'API Integration',
      'REST APIs',
      'Webhooks',
      'OpenAI API',
      'Prompt Engineering',
      'Chatbots',
    ],
  },
  {
    category: 'Full Stack Development',
    icon: 'Code2',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'PHP',
      'MySQL',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
    ],
  },
  {
    category: 'CMS & E-commerce',
    icon: 'Store',
    skills: [
      'Shopify',
      'Liquid',
      'WordPress',
      'WooCommerce',
      'Elementor',
      'Kadence',
      'Gutenberg',
      'Divi',
      'Webflow',
      'Wix',
      'Squarespace',
    ],
  },
  {
    category: 'Marketing & SEO',
    icon: 'BarChart3',
    skills: [
      'Technical SEO',
      'Meta Ads',
      'Influencer Marketing',
      'Conversion Optimization',
      'Performance Tuning',
    ],
  },
  {
    category: 'DevOps & Deployment',
    icon: 'Terminal',
    skills: [
      'Git',
      'GitHub',
      'Vercel',
      'cPanel',
      'DNS Management',
      'Server Migration',
      'Cursor',
    ],
  },
  {
    category: 'UI/UX & Design',
    icon: 'Palette',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
  },
]

export const experiences: ExperienceItem[] = [
  {
    company: "Zyne Ventures & Snug N' Play",
    role: "AI Automation & Full Stack Engineer | E-commerce Technology Lead",
    period: 'May 2024 – Present',
    location: 'Karachi, Pakistan (US Branch collaboration)',
    description:
      "Led technical engineering and e-commerce technology for Zyne Ventures (software company with a US branch) and Snug N' Play (kids' toys e-commerce brand).",
    achievements: [
      'Architected and deployed autonomous AI workflows and multi-service API integrations using n8n, Zapier, and OpenAI API.',
      'Developed modern websites and web applications leveraging React, Next.js, custom backend logic, and structured database systems.',
      'Engineered custom Shopify (Liquid) and WordPress platforms tailored for high conversions and rapid fulfillment.',
      "Supervised end-to-end e-commerce operations for Snug N' Play: catalog management, technical SEO, speed optimization, and influencer marketing campaigns.",
      'Accelerated engineering velocity via AI-assisted development workflows with Cursor, Claude, OpenAI, and Gemini.',
    ],
    skills: [
      'n8n',
      'OpenAI API',
      'Zapier',
      'Next.js',
      'React',
      'Shopify Liquid',
      'WordPress',
      'Technical SEO',
      'Cursor',
    ],
    isCurrent: true,
  },
  {
    company: 'Sleek Hive',
    role: 'Senior Web Developer',
    period: 'Nov 2022 – Apr 2024',
    location: 'Karachi, Pakistan',
    description:
      'Managed and delivered high-impact web development and e-commerce solutions for a diverse portfolio of international clients.',
    achievements: [
      'Led end-to-end development of custom WordPress, WooCommerce, and Shopify e-commerce stores from design to production.',
      'Coded bespoke themes, custom Liquid templates, and tailored plugin logic meeting client-specific feature requests.',
      'Executed complex server migrations, cPanel administration, and domain/DNS infrastructure management.',
      'Maintained version-controlled workflows with Git and GitHub, collaborating closely with design teams on Figma and Adobe XD prototypes.',
    ],
    skills: [
      'Shopify',
      'Liquid',
      'WordPress',
      'WooCommerce',
      'Git/GitHub',
      'cPanel',
      'Figma',
      'Adobe XD',
    ],
  },
  {
    company: 'Valscode',
    role: 'Frontend Developer (Promoted from Web Development Intern)',
    period: 'Nov 2020 – Nov 2022',
    location: 'Karachi, Pakistan',
    description:
      'Started as a Web Development Intern and rapidly advanced to Frontend Developer, delivering responsive web solutions across major CMS platforms.',
    achievements: [
      'Built and customized responsive websites across WordPress, Shopify, Wix, Squarespace, Webflow, and GoHighLevel.',
      'Engineered clean HTML5, CSS3, JavaScript, and Bootstrap interfaces optimized for mobile-first user experiences.',
      'Applied on-page SEO best practices and managed successful site launches and client handover deployments.',
    ],
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'WordPress',
      'Shopify',
      'Webflow',
      'GoHighLevel',
    ],
  },
]

export const education: EducationItem[] = [
  {
    degree: 'BS in Computer Science',
    institution: 'Virtual University of Pakistan',
    period: 'In Progress',
    status: 'Currently Enrolled',
    details: [
      'Core focus on Algorithms, Data Structures, Database Systems, Software Engineering, and Web Technologies.',
      'Balancing continuous academic computer science foundation with 5+ years of production industry engineering.',
    ],
  },
]

/**
 * STRICT HONESTY RULES:
 * Projects, testimonials, and metrics with isPlaceholder = true or containing [ADD ...]
 * are strictly hidden on the live website. They are defined here as ready templates
 * for Aman Ali to fill in with verified client work and results.
 */
export const projects: ProjectItem[] = [
  {
    id: 'placeholder-project-1',
    title: '[ADD PROJECT] Multi-Channel E-commerce & AI Inventory Sync',
    category: 'AI Automation',
    problem:
      'Inventory count discrepancies between custom store and multi-channel fulfillment caused overselling and manual reconciliation.',
    whatBuilt:
      'Constructed an event-driven n8n workflow connecting Shopify webhooks, Google Sheets, and OpenAI for automated stock prediction and alerts.',
    tech: ['n8n', 'Shopify Webhooks', 'OpenAI API', 'REST API', 'JavaScript'],
    result: '[ADD METRIC] Eliminated 15+ hours/week of manual updates with 99.9% sync accuracy.',
    isWorkflow: true,
    workflowSteps: [
      { id: '1', label: 'Order / Inventory Webhook', type: 'trigger', badge: 'Shopify' },
      { id: '2', label: 'Payload Normalizer', type: 'action', badge: 'n8n' },
      { id: '3', label: 'AI Anomaly & Safety Check', type: 'ai', badge: 'OpenAI' },
      { id: '4', label: 'Inventory DB & Slack Alert', type: 'destination', badge: 'Sync' },
    ],
    isPlaceholder: true, // AUTO-HIDDEN until real project added
  },
  {
    id: 'placeholder-project-2',
    title: '[ADD PROJECT] High-Performance Custom Shopify Store',
    category: 'E-commerce',
    problem:
      'Slow mobile page load speeds and high checkout drop-offs on an off-the-shelf theme.',
    whatBuilt:
      'Engineered a lightweight custom Shopify Liquid theme from scratch with zero bloated apps, dynamic cart drawer, and optimized media delivery.',
    tech: ['Shopify Liquid', 'JavaScript', 'Tailwind CSS', 'Schema.org'],
    result: '[ADD METRIC] Mobile load time cut by 60%, conversion rate lift of +24%.',
    isPlaceholder: true, // AUTO-HIDDEN until real project added
  },
  {
    id: 'placeholder-project-3',
    title: '[ADD PROJECT] Next.js Full Stack Web Platform',
    category: 'Full Stack',
    problem:
      'Legacy monolith was difficult to maintain and lacked modern reactive frontend capabilities.',
    whatBuilt:
      'Re-architected the customer portal into a modern Next.js App Router application with secure API routes and MySQL database integration.',
    tech: ['Next.js', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    result: '[ADD METRIC] Sub-second page navigations and 99.8% Core Web Vitals score.',
    isPlaceholder: true, // AUTO-HIDDEN until real project added
  },
]

export const testimonials: TestimonialItem[] = [
  {
    id: 'placeholder-testimonial-1',
    clientName: '[ADD TESTIMONIAL]',
    role: 'Founder',
    company: '[ADD COMPANY]',
    content:
      'Aman is an exceptional engineer who seamlessly blends AI automation with robust e-commerce architecture.',
    isPlaceholder: true, // AUTO-HIDDEN until real testimonial added
  },
]

export const metrics: MetricItem[] = [
  {
    label: 'Years Experience',
    value: '5+',
    isPlaceholder: false, // Verified from real profile
  },
  {
    label: 'Technologies',
    value: '10+',
    isPlaceholder: false, // Shopify, WordPress, Next.js, n8n, etc.
  },
  {
    label: 'Client Rating',
    value: '[ADD METRIC]',
    isPlaceholder: true, // AUTO-HIDDEN until real metric added
  },
  {
    label: 'Revenue Generated',
    value: '[ADD METRIC]',
    isPlaceholder: true, // AUTO-HIDDEN until real metric added
  },
]

/**
 * Filter helper functions to guarantee that no placeholder data
 * is ever rendered on the live user-facing site.
 */
export const getActiveProjects = (): ProjectItem[] => {
  return projects.filter(
    (p) => !p.isPlaceholder && !p.title.includes('[ADD PROJECT]')
  )
}

export const getActiveTestimonials = (): TestimonialItem[] => {
  return testimonials.filter(
    (t) => !t.isPlaceholder && !t.clientName.includes('[ADD TESTIMONIAL]')
  )
}

export const getActiveMetrics = (): MetricItem[] => {
  return metrics.filter(
    (m) => !m.isPlaceholder && !m.value.includes('[ADD METRIC]')
  )
}
