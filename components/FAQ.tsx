"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who are you?",
    answer:
      "I am Prince Kalla, a BCA student and aspiring Web Developer passionate about creating modern and responsive websites.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "HTML, CSS, JavaScript, React, Bootstrap, Git, GitHub, and Responsive Web Design.",
  },
  {
    question: "Are you available for internships?",
    answer:
      "Yes, I am actively looking for internships and entry-level opportunities in Web Development and Software Development.",
  },
  {
    question: "Can you build responsive websites?",
    answer:
      "Yes, I create websites that work smoothly across desktop, tablet, and mobile devices.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can contact me through the contact form, email, or LinkedIn profile.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-medium tracking-widest uppercase text-sm mb-3 block">
            Common Queries
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10"
                >
                  <ChevronDown size={18} className="text-orange-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
