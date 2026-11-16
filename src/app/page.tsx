import { Hero } from '@/components/hero'
import { WhatIDo } from '@/components/what-i-do'
import { TechStack } from '@/components/tech-stack'
import { FeaturedWork } from '@/components/featured-work'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. What I Do (Bento Grid) */}
      <WhatIDo />

      {/* 3. Tech Stack (Grouped Chips) */}
      <TechStack />

      {/* 4. Featured Work (Auto-hidden if only placeholders exist) */}
      <FeaturedWork />

      {/* 5. Experience (Vertical Timeline) */}
      <Experience />

      {/* 6. Education */}
      <Education />

      {/* 7. Testimonials (Auto-hidden if only placeholders exist) */}
      <Testimonials />

      {/* 8. Contact (Working Form + Channels) */}
      <Contact />
    </>
  )
}
