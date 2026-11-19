import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { AiShowcase } from '@/components/ai-showcase'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Services */}
      <Services />

      {/* 3. AI Automation Showcase */}
      <AiShowcase />

      {/* 4. All Projects */}
      <Projects />

      {/* 5. Skills */}
      <Skills />

      {/* 6. Experience */}
      <Experience />

      {/* 7. Education */}
      <Education />

      {/* 8. Contact */}
      <Contact />
    </>
  )
}
