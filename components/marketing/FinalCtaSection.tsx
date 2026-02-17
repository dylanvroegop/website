"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { ExampleOfferModal } from "./ExampleOfferModal";

const benefits = [
  "Geen creditcard nodig",
  "Binnen 10 min live",
  "Opzeggen wanneer je wil",
];

export function FinalCtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Maak vandaag nog je eerste offerte in 10 minuten.
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              {benefits.map((benefit, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {benefit}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
              >
                Start gratis proef
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
                aria-label="Bekijk een voorbeeld offerte"
              >
                <FileCheck className="w-5 h-5" />
                Bekijk voorbeeld-offerte
              </button>
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
