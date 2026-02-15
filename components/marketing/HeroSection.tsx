"use client";

import { useState } from "react";
import { ArrowRight, Play, Clock, TrendingUp, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { HeroDevices } from "@/components/ui/HeroDevices";
import { ExampleOfferModal } from "./ExampleOfferModal";

const benefitStrip = [
  { icon: Clock, label: "Offerte in 5–10 min" },
  { icon: TrendingUp, label: "Winst & marge onder controle" },
  { icon: FileCheck, label: "Professionele PDF's" },
];

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,hsla(158,93%,40%,0.08),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Tension line */}
            <p className="text-sm sm:text-base font-medium text-gray-400 mb-4 tracking-wide">
              Geen Excel. Geen giswerk. Geen fouten.
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-4 leading-none">
              Offertes in minuten.
            </h1>

            {/* Outcome-driven subline */}
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4">
              Slimme calculaties. Winst direct zichtbaar.
            </p>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Calvora helpt vakmensen professionele offertes maken, klussen
              beheren en grip houden op winst — zonder urenlang te rekenen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-8">
              <a
                href="/contact"
                className="group bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow flex items-center justify-center gap-2"
              >
                Plan een demo
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
                aria-label="Bekijk een voorbeeld offerte"
              >
                <FileCheck size={18} />
                Bekijk voorbeeld offerte
              </button>
              <a
                href="/workflow"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-base font-medium text-gray-400 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </div>
                Bekijk workflow
              </a>
            </div>

            {/* Benefit strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              {benefitStrip.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero multi-device mockup */}
          <div className="mt-16 lg:mt-20">
            <HeroDevices />
          </div>
        </div>
      </section>

      <ExampleOfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
