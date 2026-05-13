'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 ml-1">
              Welcome to my universe
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9]">
              KALLA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                PRINCE
              </span>
            </h1>
            <p className="font-sans text-xl md:text-2xl mt-4 text-gray-400 font-light max-w-lg">
              Web Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-800 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl font-light max-w-xl leading-relaxed"
          >
            Creative web developer focused on building modern, responsive, and visually engaging websites with clean design, smooth user experience, and premium-quality digital aesthetics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105"
            >
              Book Project
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white border border-white/20 transition-all duration-300 hover:bg-white/5 hover:border-white/40"
            >
              View Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-8"
          >
            <a
              href="https://github.com/prince8160"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:-translate-y-1"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/prince-kala-b38754334"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:-translate-y-1"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:kallaprince221@gmail.com"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/50 hover:bg-orange-500/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:-translate-y-1"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Content - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full flex items-center justify-center lg:justify-end lg:-translate-y-8 mt-12 lg:mt-0"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-purple-600/20 to-transparent rounded-full blur-[100px] z-0" />
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-[480px] xl:max-w-[500px] aspect-[4/5] z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(249,115,22,0.25)] group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_60px_rgba(249,115,22,0.5)] hover:border-orange-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
            
            {/* 
              Using a web-accessible public path for the image.
              Please ensure "page1.png" is uploaded to the "public/images" directory.
            */}
            <img 
              src="/images/page1.png" 
              alt="Kalla Prince"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/kallaprincehero/800/1000";
              }}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute right-0 bottom-20 w-32 h-32 border border-white/10 rounded-full border-dashed opacity-30"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute left-10 top-20 w-40 h-40 border border-white/10 rounded-full border-dashed opacity-20"
          />
        </motion.div>
      </div>
    </section>
  );
}
