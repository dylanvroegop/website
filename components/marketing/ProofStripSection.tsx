"use client";

import { motion } from "framer-motion";
import { Timer, ShieldCheck, Upload } from "lucide-react";

const metrics = [
  {
    icon: Timer,
    value: "60–90 min",
    label: "sneller per offerte",
  },
  {
    icon: ShieldCheck,
    value: "Marge check",
    label: "vóór verzenden",
  },
  {
    icon: Upload,
    value: "Jouw prijslijst",
    label: "CSV upload of standaard",
  },
];

export function ProofStripSection() {
  return (
    <section className="py-10 lg:py-14 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 text-center mt-6">
            Gebaseerd op interne tests
          </p>
        </motion.div>
      </div>
    </section>
  );
}
