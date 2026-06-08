"use client";

import { motion } from "motion/react";
import { Layout, Smartphone, Code2, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Layout className="w-8 h-8 text-orange-400" />,
    title: "UI/UX Design",
    description:
      "Crafting premium, intuitive, and modern user interfaces with a focus on immersive experiences and glassmorphism aesthetics.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-orange-400" />,
    title: "Frontend Development",
    description:
      "Building high-performance, pixel-perfect web applications using React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-orange-400" />,
    title: "Responsive Layouts",
    description:
      "Ensuring your website looks flawless on all devices, from ultra-wide desktop monitors to mobile screens.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-orange-400" />,
    title: "Interactive Animation",
    description:
      "Adding cinematic motion, scroll effects, and micro-interactions to make the digital experience feel alive and premium.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            What I Do
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Premium Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-panel p-10 rounded-3xl group glass-panel-hover"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-orange-500/10 group-hover:border-orange-500/30">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display">
                {service.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
