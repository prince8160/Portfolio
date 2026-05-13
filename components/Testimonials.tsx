'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Kalla transforms complex requirements into elegant, seamless interfaces. His attention to detail and premium design sensibility elevated our platform beyond our expectations.",
    author: "Sarah Jenkins",
    role: "CEO, Aura Fintech",
    image: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    text: "Working with Kalla was a revelation. He doesn't just write code; he crafts digital experiences. The bespoke 3D viewer he built for us doubled our engagement metrics.",
    author: "Marcus Thorne",
    role: "Director, Nexus Retail",
    image: "https://picsum.photos/seed/marcus/100/100"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">Client Words</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Trusted by Leaders</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-panel p-10 md:p-12 rounded-3xl relative"
            >
              <Quote className="w-12 h-12 text-white/5 absolute top-8 right-8" />
              <p className="text-lg md:text-xl text-gray-300 font-serif italic leading-relaxed mb-8 relative z-10">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-14 h-14 rounded-full object-cover border border-white/20" />
                <div>
                  <h4 className="text-white font-bold">{t.author}</h4>
                  <p className="text-orange-400 text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
