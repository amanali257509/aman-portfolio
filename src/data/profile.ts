export interface ProfileData {
  name: string
  title: string
  subtitle: string
  location: string
  availability: string
  experienceYears: string
  email: string
  links: {
    github: string
    linkedin: string
    fiverr: string
    cv: string
  }
  hero: {
    headingLine1: string
    headingLine2: string
    paragraph: string
    primaryCta: string
    secondaryCta: string
    facts: string[]
  }
  education: {
    degree: string
    status: string
    institution: string
  }
}

export const profile: ProfileData = {
  name: 'Aman Ali',
  title: 'WordPress & Shopify Expert',
  subtitle: 'AI Automation Specialist',
  location: 'Karachi, Pakistan',
  availability: 'Open to remote work worldwide',
  experienceYears: '5+ years experience',
  email: 'amanali257509@gmail.com',
  links: {
    github: 'https://github.com/amanali257509',
    linkedin: 'https://www.linkedin.com/in/aman-ali-dev/',
    fiverr: 'https://www.fiverr.com/sellers/amanali414/',
    cv: '/Aman_Ali_CV.pdf',
  },
  hero: {
    headingLine1: 'WordPress & Shopify Expert',
    headingLine2: 'AI Automation Specialist',
    paragraph:
      "I'm a web developer from Karachi with 5+ years of experience in e-commerce, WordPress and Shopify. I also build workflows with n8n, Zapier and OpenAI to automate orders, support and daily operations. Open to remote work worldwide.",
    primaryCta: 'Contact me',
    secondaryCta: 'View CV',
    facts: ['5+ years experience', 'Karachi, Pakistan'],
  },
  education: {
    degree: 'Bachelor of Science in Computer Science',
    status: 'In progress',
    institution: 'Virtual University of Pakistan',
  },
}
