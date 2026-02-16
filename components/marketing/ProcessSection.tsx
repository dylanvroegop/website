"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteCopy } from "@/content/copy";

const steps = [
  {
    number: 1,
    label: "Klant",
    verb: "Selecteer",
    images: ["/screenshots/workflow/stap-1.png"],
  },
  {
    number: 2,
    label: "Klus",
    verb: "Omschrijf",
    images: ["/screenshots/workflow/stap-2.png"],
  },
  {
    number: 3,
    label: "Materialen",
    verb: "Stel samen",
    images: [
      "/screenshots/workflow/stap-3-boven.png",
      "/screenshots/workflow/stap-3-onder.png",
    ],
  },
  {
    number: 4,
    label: "Maatwerk",
    verb: "Meet op",
    images: ["/screenshots/workflow/stap-4.png"],
  },
  {
    number: 5,
    label: "Overzicht",
    verb: "Controleer",
    images: ["/screenshots/workflow/stap-5.png"],
  },
];

export function ProcessSection() {
  const { workflowTeaser } = siteCopy;
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];

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

        {/* Clickable steps */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-0 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-0">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 ${
                  activeStep === i
                    ? "bg-primary/15 border border-primary/30"
                    : "border border-transparent hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-200 ${
                    activeStep === i
                      ? "bg-primary text-white"
                      : "bg-primary/10 border border-primary/20 text-primary"
                  }`}
                >
                  {step.number}
                </div>
                <div className="sm:text-center">
                  <p
                    className={`font-semibold text-sm leading-tight transition-colors duration-200 ${
                      activeStep === i ? "text-white" : "text-white"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500">{step.verb}</p>
                </div>
              </motion.button>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-600 mx-3 hidden sm:block" />
              )}
            </div>
          ))}
        </div>

        {/* Screenshot viewer */}
        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 bg-[#111]">
          {/* Top bar */}
          <div className="h-9 border-b border-white/10 bg-[#161618] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 text-xs text-gray-500 font-medium">
              Calvora — Calculatie
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {currentStep.images.length === 1 ? (
                <Image
                  src={currentStep.images[0]}
                  alt={`Stap ${currentStep.number} — ${currentStep.label}`}
                  width={2880}
                  height={1864}
                  className="w-full h-auto"
                />
              ) : (
                <div className="grid grid-cols-2 gap-px bg-white/5">
                  {currentStep.images.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`Stap ${currentStep.number} — ${currentStep.label} (${i + 1})`}
                      width={1440}
                      height={1864}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

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
