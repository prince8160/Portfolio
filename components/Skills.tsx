"use client";

import { motion } from "motion/react";
import {
  Code2,
  Palette,
  FileJson,
  Blocks,
  Layout,
  GitBranch,
  Github,
  MonitorSmartphone,
} from "lucide-react";

const skills = [
  {
    name: "HTML",
    icon: Code2,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50",
  },
  {
    name: "CSS",
    icon: Palette,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    name: "JavaScript",
    icon: FileJson,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "group-hover:border-yellow-400/50",
  },
  {
    name: "React",
    icon: Blocks,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/50",
  },
  {
    name: "Bootstrap",
    icon: Layout,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
  },
  {
    name: "Git",
    icon: GitBranch,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
  },
  {
    name: "GitHub",
    icon: Github,
    color: "text-gray-300",
    bg: "bg-gray-300/10",
    border: "group-hover:border-gray-500/50",
  },
  {
    name: "Responsive Design",
    icon: MonitorSmartphone,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/50",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light max-w-2xl mx-auto">
            I leverage the latest modern web technologies to create scalable,
            performant, and visually stunning applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`group glass-panel p-6 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border border-white/5 ${skill.border} hover:bg-white/5`}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${skill.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <skill.icon
                  className={`w-8 h-8 ${skill.color}`}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-white font-medium tracking-wide text-sm text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
