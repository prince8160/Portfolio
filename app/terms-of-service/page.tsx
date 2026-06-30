import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4 md:px-6 max-w-4xl mx-auto w-full relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 text-white">Terms of Service</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. Website Usage Terms</h2>
              <p>
                By accessing this portfolio and service website, you agree to be bound by these Terms of Service and comply with all applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Booking & Project Terms</h2>
              <p>
                Submitting a project booking request does not constitute a legally binding service agreement. 
                All projects are subject to review, availability, and a subsequent formal contract. 
                We reserve the right to decline project requests that do not align with our expertise or timeline constraints.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. User Responsibilities</h2>
              <p>
                You agree to provide accurate and complete information when booking a project or creating an account. 
                You are responsible for safeguarding the password that you use to access the services and for any activities or actions under your password.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Intellectual Property Notice</h2>
              <p>
                The materials contained in this website, including but not limited to design, layout, look, appearance, and graphics, are owned by or licensed to us. 
                The custom code and deliverables created during paid projects remain the intellectual property of the client upon final payment, unless otherwise stated in the project contract.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Service Limitations</h2>
              <p>
                The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, 
                and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
