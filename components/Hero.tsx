"use client";

import { useEffect, useRef } from "react";
import { motion, animate } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight, CheckCircle } from "lucide-react";

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + "+";
        },
      });

      return () => controls.stop();
    }
  }, [from, to]);

  return <span ref={nodeRef} />;
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8 z-10 lg:pr-8">
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
            Creative web developer focused on building modern, responsive, and
            visually engaging websites with clean design, smooth user
            experience, and premium-quality digital aesthetics.
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
              Contact Me
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white border border-orange-500/50 bg-orange-500/10 transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 pt-8 md:gap-8"
          >
            <div className="flex items-center gap-4">
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
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-500">
                <CheckCircle size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-display leading-none">
                  <Counter from={0} to={10} />
                </span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Completed Projects</span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Right Content - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full flex items-center justify-center lg:-translate-y-24 mt-4 lg:mt-0"
        >
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-purple-600/20 to-transparent rounded-full blur-[100px] z-0" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] xl:max-w-[360px] aspect-[4/5] z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(249,115,22,0.25)] group hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_60px_rgba(249,115,22,0.5)] hover:border-orange-500/50 transition-all duration-500"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

            <img
              src="/images/page1.png"
              alt="Kalla Prince"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Decorative Circles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute right-4 bottom-12 w-24 h-24 border border-white/10 rounded-full border-dashed opacity-30"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute left-6 top-6 w-32 h-32 border border-white/10 rounded-full border-dashed opacity-20"
          />
        </motion.div>
      </div>
    </section>
  );
}
