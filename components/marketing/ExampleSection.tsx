"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

const inputSpecs = [
  { label: "Lengte", value: "4 m" },
  { label: "Hoogte", value: "2,6 m" },
  { label: "H.o.h.", value: "600 mm" },
  { label: "Beplating", value: "Dubbel" },
];

const outputRows = [
  { label: "Materialen (regels, isolatie, platen)", value: "€ 842,–" },
  { label: "Klein materiaal (5%)", value: "€ 42,–" },
  { label: "Transport", value: "€ 75,–" },
  { label: "Arbeid", value: "€ 480,–" },
  { label: "Marge (15%)", value: "€ 216,–" },
];

const total = "€ 1.655,–";

export function ExampleSection() {
  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Voorbeeld: voorzetwand offerte
          </h2>
          <p className="text-gray-400">
            Dit is wat Calvora genereert op basis van jouw invoer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          {/* Input specs */}
          <div className="p-5 border-b border-white/10">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Invoer
            </p>
            <div className="flex flex-wrap gap-3">
              {inputSpecs.map((spec) => (
                <span
                  key={spec.label}
                  className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md px-3 py-1.5 text-sm text-gray-300"
                >
                  <span className="text-gray-500">{spec.label}:</span>
                  <span className="font-medium text-white">{spec.value}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Output table */}
          <div className="p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Resultaat
            </p>
            <div className="space-y-2">
              {outputRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-sm py-1.5"
                >
                  <span className="text-gray-400">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10">
                <span className="text-white font-bold">Totaal excl. BTW</span>
                <span className="text-primary text-lg font-bold">{total}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <a
            href="/Offerte-260191.pdf"
            download="Calvora-Voorbeeld-Offerte.pdf"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <Download className="w-4 h-4" />
            Download voorbeeld PDF
          </a>
        </div>
      </div>
    </section>
  );
}
