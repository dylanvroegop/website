"use client";

import { useState } from "react";
import { ArrowRight, FileCheck, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExampleOfferModal } from "./ExampleOfferModal";

const heroBullets = [
  { icon: Clock, text: "Bespaart 1–2 uur per offerte" },
  { icon: ShieldCheck, text: "Voorkomt vergeten posten (klein materiaal, transport, steiger…)" },
  { icon: TrendingUp, text: "Winst direct zichtbaar vóór je verzendt" },
];

const microTrust = [
  "Geen creditcard nodig",
  "Opzeggen wanneer je wil",
  "Binnen 10 min live",
];

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,hsla(158,93%,40%,0.08),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-[1.1]">
                Offertes in 10 minuten.
                <br />
                <span className="text-primary">Speciaal voor timmermannen.</span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-white/90 mb-4">
                Nooit meer onder je kostprijs.
              </p>

              <p className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed">
                Calvora zet jouw maten en werkwijze om in een technisch nette offerte
                met actuele prijzen, klein materiaal, transport en marge. Zonder gedoe.
              </p>

              {/* Benefit bullets */}
              <ul className="flex flex-col gap-3 mb-8">
                {heroBullets.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-white text-base sm:text-lg">
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="/contact"
                  className="group bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow flex items-center justify-center gap-2"
                >
                  Start gratis proef
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
                  Bekijk voorbeeld-offerte
                </button>
              </div>

              {/* Micro-trust */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                {microTrust.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </motion.div>

            {/* Right — Device mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/hero-website-picture.png"
                alt="Calvora op desktop, laptop, tablet en telefoon"
                width={1200}
                height={900}
                priority
                className="w-full h-auto"
              />
            </motion.div>
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
