"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Instagram,
} from "lucide-react";

export function Contact() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kallaprince221@gmail.com");
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Great.
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
            If you have any questions, feedback, business inquiries, or
            support-related concerns, feel free to contact us anytime. We are
            committed to providing professional web development services,
            modern digital solutions, and the best possible user experience.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 mb-16">
            <a
              href="https://github.com/prince8160"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                <Github
                  size={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/prince-kala-b38754334"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                <Linkedin
                  size={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                LinkedIn
              </span>
            </a>

            <a
              href="https://www.instagram.com/web.district?igsh=MXY4eDRxbXp5cWQ0ZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                <Instagram
                  size={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                Instagram
              </span>
            </a>

            <a
              href="mailto:kallaprince221@gmail.com"
              className="group relative flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-orange-400 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:-translate-y-2">
                <Mail
                  size={28}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-orange-400 tracking-wide translate-y-2 group-hover:translate-y-0">
                Email
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl w-fit mb-16 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <Mail className="text-orange-500 w-5 h-5 hidden sm:block" />
            <span className="text-gray-300 font-medium">
              kallaprince221@gmail.com
            </span>
            <button
              onClick={handleCopyEmail}
              className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
              aria-label="Copy email address"
            >
              {hasCopied ? (
                <Check size={18} className="text-green-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
