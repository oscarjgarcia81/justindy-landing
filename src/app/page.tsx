import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LavaLampBackground from '@/components/LavaLampBackground'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import DeploymentOptions from '@/components/sections/DeploymentOptions'
import WhyMe from '@/components/sections/WhyMe'
import Stats from '@/components/sections/Stats'
import CTA from '@/components/sections/CTA'
import AboutMe from '@/components/sections/AboutMe'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <LavaLampBackground />
      <Header />
      <Hero />
      <Services />
      <DeploymentOptions />
      <WhyMe />
      <Stats />
      <CTA />
      <AboutMe />
      <Footer />
    </main>
  )
}
