import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
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
          
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 text-white">Cookie Policy</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. What are Cookies?</h2>
              <p>
                Cookies are small pieces of text sent to your web browser by a website you visit. 
                A cookie file is stored in your web browser and allows the service or a third-party to recognize you and make your next visit easier and the service more useful to you.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Authentication & Essential Cookies</h2>
              <p>
                We use strictly necessary cookies to authenticate users and prevent fraudulent use of user accounts. 
                These cookies are generated securely by Firebase when you log into our platform to manage your project bookings. 
                Without these cookies, securely reserving services on our platform would not be possible.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. Analytics & Performance Cookies</h2>
              <p>
                We may use analytics services that deploy cookies to track information on how this website is used. 
                This helps us improve our service performance, track the effectiveness of our design layout, and understand site traffic patterns.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Your Cookie Choices</h2>
              <p>
                If you&apos;d like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. 
                Please note, however, that if you delete cookies or refuse to accept them, you might not be able to log in, you may not be able to store your preferences, and some of our pages might not display properly.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
