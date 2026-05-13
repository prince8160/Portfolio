import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Skills } from '@/components/Skills';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
