import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import EthosStrip from '@/components/EthosStrip'
import ProductGrid from '@/components/ProductGrid'
import ProcessSection from '@/components/ProcessSection'
import FeaturedCollection from '@/components/FeaturedCollection'
import WeddingSection from '@/components/WeddingSection'
import JournalSection from '@/components/JournalSection'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <EthosStrip />
      <ProductGrid />
      <ProcessSection />
      <FeaturedCollection />
      <WeddingSection />
      <JournalSection />
      <Testimonials />
      <Footer />
    </main>
  )
}
