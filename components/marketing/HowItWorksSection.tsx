"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Upload prijslijst",
    subtitle: "(of kies standaard)",
    benefit: "Jouw materialen, jouw prijzen — direct klaar voor gebruik.",
  },
  {
    number: "2",
    title: "Vul maten + werkwijze in",
    subtitle: "",
    benefit: "De wizard berekent materialen, klein materiaal en arbeid automatisch.",
  },
  {
    number: "3",
    title: "Verzend offerte",
    subtitle: "(PDF)",
    benefit: "Professionele PDF met werkomschrijving, marge en totaal. Klaar.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Zo werkt het
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass-card p-6"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {step.title}
                {step.subtitle && (
                  <span className="text-gray-500 font-normal"> {step.subtitle}</span>
                )}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.benefit}
              </p>

              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 z-10" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
          >
            Start gratis proef
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
