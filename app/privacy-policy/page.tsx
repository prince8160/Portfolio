import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-white mb-4">1. User Data Privacy</h2>
              <p>
                We are committed to protecting your personal information and your right to privacy. 
                When you visit our website and use our booking services, you trust us with your personal information. 
                We take your privacy very seriously. We carefully handle all project details and communications 
                with the utmost confidentiality.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">2. Authentication Information</h2>
              <p>
                Our authentication processes use industry-standard security measures. 
                When you create an account to book a project, your credentials are encrypted and stored securely. 
                We only collect necessary information such as your email address and name to manage your bookings and identity securely.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">3. Booking Data Handling</h2>
              <p>
                Project details and booking information submitted through our platform are securely stored in our cloud databases. 
                This information is used strictly for evaluating, quoting, and managing your software or design projects.
                We do not sell, rent, or share your project requirements with third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">4. Firebase & Google Authentication Notice</h2>
              <p>
                Our application utilizes Google Firebase for backend deployment, authentication, and database services. 
                When you sign in using Google Auth or Email/Password, Firebase securely processes your login data.
                Please refer to Google&apos;s Privacy Policy to understand how Firebase manages data as a sub-process.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-medium text-white mb-4">5. Contact Information</h2>
              <p>
                If you have questions or comments about this notice, you may email us at 
                <a href="mailto:kallaprince221@gmail.com" className="text-orange-400 hover:underline ml-1">
                  kallaprince221@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
