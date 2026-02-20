import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyMe from '@/components/sections/WhyMe'
import Stats from '@/components/sections/Stats'
import CTA from '@/components/sections/CTA'
import AboutMe from '@/components/sections/AboutMe'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <Hero />
      <Services />
      <WhyMe />
      <Stats />
      <CTA />
      <AboutMe />
      <Footer />
    </main>
  )
}
