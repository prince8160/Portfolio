"use client";

import { motion } from "motion/react";
import { Download } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/20 to-purple-600/20 blur-2xl z-0 rounded-3xl" />
            <div className="glass-panel p-8 rounded-3xl relative z-10 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Crafting Digital <br />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Experiences
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                I am a passionate web developer with a keen eye for aesthetics
                and a strong technical foundation. I specialize in building
                highly interactive, responsive, and performant web applications
                that leave a lasting impression.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                My approach combines clean code architecture with premium design
                principles, ensuring every project not only functions flawlessly
                but looks extraordinary.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-4xl font-display font-bold text-white mb-2">
                    1+
                  </h4>
                  <p className="text-sm tracking-wide uppercase text-orange-500 font-medium">
                    Years Experience
                  </p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-white mb-2">
                    50+
                  </h4>
                  <p className="text-sm tracking-wide uppercase text-orange-500 font-medium">
                    Projects Delivered
                  </p>
                </div>
              </div>

              <a
                href="/resume/resume.pdf"
                download="Prince-Kalla-Resume.pdf"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white font-medium overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-500/10 to-orange-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />
                <span className="relative z-10 flex items-center gap-2">
                  Download Resume{" "}
                  <Download
                    size={18}
                    className="group-hover:-translate-y-1 group-hover:text-orange-400 transition-all duration-300"
                  />
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden glass-panel group"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-black/20" />
            <img
              src="https://picsum.photos/seed/kallaprince/600/800"
              alt="Creative Space"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 border border-white/10 rounded-3xl z-20 pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 z-30">
              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-2">Vision</h3>
                <p className="text-sm text-gray-300">
                  Transforming complex problems into elegant, intuitive, and
                  modern web solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
