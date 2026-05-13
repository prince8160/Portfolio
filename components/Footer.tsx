'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5 relative overflow-hidden bg-black/50 backdrop-blur-md z-10 w-full mt-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-orange-600/5 blur-[150px] rounded-t-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="#home" className="text-3xl font-display font-bold tracking-tighter block mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                KALLA
              </span>{' '}
              PRINCE
            </Link>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed mb-8">
              Premium web development services crafting bespoke digital experiences and high-performance applications.
            </p>
            <div className="flex items-center gap-4">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide uppercase text-sm">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Kalla Prince. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed & Developed with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
