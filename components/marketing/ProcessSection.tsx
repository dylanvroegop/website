"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteCopy } from "@/content/copy";

const stepVerbs = [
  { number: 1, label: "Klant", verb: "Selecteer" },
  { number: 2, label: "Klus", verb: "Omschrijf" },
  { number: 3, label: "Type", verb: "Kies" },
  { number: 4, label: "Materialen", verb: "Stel samen" },
  { number: 5, label: "Metingen", verb: "Meet op" },
  { number: 6, label: "Overzicht", verb: "Controleer" },
];

export function ProcessSection() {
  const { workflowTeaser } = siteCopy;

  return (
    <section className="py-20 lg:py-28 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {workflowTeaser.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {workflowTeaser.subtitle}
          </p>
        </motion.div>

        {/* Horizontal steps (desktop) / Vertical (mobile) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-0 mb-12">
          {stepVerbs.map((step, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {step.number}
                </div>
                <div className="sm:text-center">
                  <p className="text-white font-semibold text-sm leading-tight">
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500">{step.verb}</p>
                </div>
              </motion.div>
              {i < stepVerbs.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-600 mx-3 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        {/* Workflow screenshot with styled frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 bg-[#111]"
        >
          {/* Top bar */}
          <div className="h-9 border-b border-white/10 bg-[#161618] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 text-xs text-gray-500 font-medium">Calvora — Calculatie</span>
          </div>
          <Image
            src="/drawingscreenshot.png"
            alt="Calvora Calculatie Workflow"
            width={2880}
            height={1864}
            className="w-full h-auto"
          />
        </motion.div>

        <div className="mt-8 text-center">
          <a
            href="/workflow"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
          >
            {workflowTeaser.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
