'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Nexus E-Commerce',
    category: 'Full-Stack Web App',
    image: 'https://picsum.photos/seed/nexus/800/600',
    description: 'A premium headless e-commerce platform with a bespoke 3D product viewer and seamless checkout.',
  },
  {
    title: 'Aura Fintech',
    category: 'UI/UX & Frontend',
    image: 'https://picsum.photos/seed/aura/800/600',
    description: 'Modern banking dashboard featuring real-time data visualization and glassmorphism interface.',
  },
  {
    title: 'Vertex Real Estate',
    category: 'Corporate Website',
    image: 'https://picsum.photos/seed/vertex/800/600',
    description: 'Luxury property listing platform with immersive virtual tours and bespoke property filters.',
  },
  {
    title: 'Synapse AI Platform',
    category: 'SaaS Application',
    image: 'https://picsum.photos/seed/synapse/800/600',
    description: 'Intuitive AI dashboard for generating architectural renders with complex prompt engineering tools.',
  }
];

export function Portfolio() {
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
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6 glass-panel aspect-[4/3]">
                <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <ExternalLink size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Github size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-orange-400 text-sm font-medium tracking-wide uppercase mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold mb-3 font-display">{project.title}</h3>
                <p className="text-gray-400 font-light line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all text-white font-medium hover:border-white/40">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
