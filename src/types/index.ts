export interface SocialLink {
  name: string
  url: string
  icon: string
  label: string
}

export interface PersonalDetails {
  name: string
  location: string
  timezone: string
  headline: string
  tagline: string
  availability: string
  yearsOfExperience: string
  email: string
  links: {
    github: string
    linkedin: string
    fiverr: string
  }
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location?: string
  description: string
  achievements: string[]
  skills: string[]
  isCurrent?: boolean
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  status: string
  details?: string[]
}

export interface ServiceItem {
  id: string
  title: string
  shortDescription: string
  description: string
  tags: string[]
  icon: string
  highlight?: boolean
}

export interface SkillCategory {
  category: string
  icon: string
  skills: string[]
}

export interface WorkflowNode {
  id: string
  label: string
  type: 'trigger' | 'action' | 'ai' | 'destination'
  badge?: string
}

export interface ProjectItem {
  id: string
  title: string
  category: 'AI Automation' | 'Full Stack' | 'E-commerce' | 'Custom CMS'
  problem: string
  whatBuilt: string
  tech: string[]
  result?: string // Only if verified real
  liveUrl?: string
  githubUrl?: string
  isWorkflow?: boolean
  workflowSteps?: WorkflowNode[]
  isPlaceholder: boolean
}

export interface TestimonialItem {
  id: string
  clientName: string
  role: string
  company: string
  content: string
  isPlaceholder: boolean
}

export interface MetricItem {
  label: string
  value: string
  isPlaceholder: boolean
}
