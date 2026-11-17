import { Hero } from '@/components/hero'
import { WhatIDo } from '@/components/what-i-do'
import { Projects } from '@/components/projects'
import { TechStack } from '@/components/tech-stack'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <>
      {/* 1. Hero with Prominent Badges */}
      <Hero />

      {/* 2. What I Do (WordPress, Shopify, AI Automation, Webflow, Full Stack, SEO) */}
      <WhatIDo />

      {/* 3. Projects Showcase with Category Filter Tabs */}
      <Projects />

      {/* 4. Tech Stack */}
      <TechStack />

      {/* 5. Experience Timeline */}
      <Experience />

      {/* 6. Education */}
      <Education />

      {/* 7. Testimonials (Auto-hidden if empty) */}
      <Testimonials />

      {/* 8. Contact Form & Direct Channels */}
      <Contact />
    </>
  )
}
