"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePath: string;
}

export function ResumeModal({ isOpen, onClose, imagePath }: ResumeModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(249,115,22,0.15)] bg-[#0a0a0a]/90 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                My Resume
              </h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-400 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Image Container */}
            <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 bg-black/40 scrollbar-hide">
              <div className="relative w-full min-h-[50vh] sm:min-h-[70vh]">
                <Image
                  src={imagePath}
                  alt="Resume"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
