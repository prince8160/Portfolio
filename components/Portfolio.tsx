"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, Maximize2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Chehar Dental Clinic",
    category: "Dental Clinic Website",
    image: "/images/chehardentalclinic.png",
    description:
      "A modern and responsive dental clinic website with appointment booking, service details, and a clean user-friendly design.",
    technologies: ["React", "Tailwind CSS", "Next.js"],
    url: "https://chehardentalclinic.netlify.app/",
  },
  {
    title: "Deesa Dental",
    category: "Dental Clinic Website",
    image: "/images/DEESADENTAL.png",
    description:
      "A professional dental clinic website featuring a clean user interface, service sections, contact information, and mobile-friendly design.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    url: "https://frabjous-gaufre-155dc9.netlify.app/",
  },
  {
    title: "Tanmay Dental Clinic",
    category: "Dental Clinic Website",
    image: "/images/tanmaydentalclinic.png",
    description:
      "A premium dental clinic website built with a modern design, clear service presentation, appointment-focused layout, and responsive user experience.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    url: "https://tanmaydentalclinic.netlify.app/",
  },
  {
    title: "ITI Deesa",
    category: "Website",
    image: "/images/DeesaITI.png",
    description:
      "A modern and responsive website developed for ITI Deesa, featuring course details, admissions, institute information, and a clean user-friendly design.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    url: "https://itideesa.netlify.app/",
  },
  {
    title: "Hardik portfolio",
    category: "Portfolio Website",
    image: "/images/HardikPortfolio.png",
    description:
      "A modern and responsive personal portfolio website showcasing skills, projects, and professional achievements.",
    technologies: ["React", "Node.js", "MongoDB"],
    url: "https://hardiklimbachiya.netlify.app/",
  },
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Selected Works
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Demo Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group"
            >
              <div 
                className="relative overflow-hidden rounded-3xl mb-6 glass-panel aspect-[4/3] border border-white/5 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-contain p-4 bg-black/40 transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex flex-col gap-3 w-full max-w-[200px]">
                    <button
                      className="w-full py-2.5 rounded-full bg-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-colors font-medium text-sm backdrop-blur-md border border-white/10"
                    >
                      <Maximize2 size={16} />
                      View Image
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 rounded-full bg-orange-500 text-white flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors font-medium text-sm shadow-lg shadow-orange-500/25"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-orange-400 text-sm font-medium tracking-wide uppercase mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold mb-3 font-display">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-light mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all text-white font-medium hover:border-white/40 cursor-pointer"
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col"
            >
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative w-full h-[80vh] bg-black/40 p-2 sm:p-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
