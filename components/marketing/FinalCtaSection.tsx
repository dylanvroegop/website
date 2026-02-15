"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Rocket,
  Headphones,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { ExampleOfferModal } from "./ExampleOfferModal";

// TODO: Verify these claims are accurate; toggle off if not
const trustItems = [
  { icon: CreditCard, label: "Geen creditcard nodig" },
  { icon: Rocket, label: "Snel onboarden" },
  { icon: Headphones, label: "Support in Nederland" },
];

const benefits = [
  "Geen creditcard vereist",
  "14 dagen gratis proberen",
  "Volledige functionaliteit",
  "Nederlandse support",
];

export function FinalCtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stop met gissen. Start met calculeren.
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Professionele offertes in minuten, grip op je winst en minder
              admin. Ontdek wat Calvora voor jouw bedrijf kan doen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
              >
                Plan een demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
                aria-label="Bekijk een voorbeeld offerte"
              >
                <FileCheck className="w-5 h-5" />
                Bekijk voorbeeld offerte
              </button>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-10">
              {benefits.map((benefit, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {benefit}
                </span>
              ))}
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5">
              {trustItems.map(({ icon: Icon, label }, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ExampleOfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
