import Header from '@/components/Header'
import HeroCompact from '@/components/sections/HeroCompact'
import ProfessionalDeployment from '@/components/sections/ProfessionalDeployment'
import AboutMe from '@/components/sections/AboutMe'
import HowItWorks from '@/components/sections/HowItWorks'
import Stats from '@/components/sections/Stats'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/Footer'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function Home() {
  return (
    <>
      {/* Background animations (fixed, behind all content) */}
      <BackgroundAnimation />

      {/* Main content (relative, scrolls over background) */}
      <main className="relative w-full z-20">
        <Header />
        <HeroCompact />
        <ProfessionalDeployment />
        <HowItWorks />
        <Stats />
        <CTA />
        <AboutMe />
        <Footer />
      </main>
    </>
  )
}
