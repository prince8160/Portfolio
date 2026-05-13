'use client';

import { motion } from 'motion/react';

const skills = [
  { name: 'React & Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Tailwind CSS', level: 98 },
  { name: 'Framer Motion', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'UI/UX Design', level: 88 },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Technical <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">Arsenal</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-lg">
              I leverage the latest modern web technologies to create scalable, performant, and visually stunning applications that push the boundaries of what&apos;s possible on the web.
            </p>
          </motion.div>

          <div className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-medium tracking-wide">{skill.name}</span>
                  <span className="text-orange-400 text-sm font-mono">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
