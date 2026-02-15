"use client";

import { motion } from "framer-motion";
import { Timer, TrendingUp, Layers, Quote } from "lucide-react";

// TODO: Replace with real metrics once available from user data
const metrics = [
  {
    icon: Timer,
    value: "80%",
    label: "Minder offertetijd",
  },
  {
    icon: TrendingUp,
    value: "5–10 min",
    label: "Per offerte",
  },
  {
    icon: Layers,
    value: "+",
    label: "Betere marge door overhead & klein materiaal",
  },
];

export function ProofSection() {
  return (
    <section className="py-16 lg:py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
          {/* TODO: Update disclaimer once hard proof is available */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Gemiddelden op basis van vroege gebruikers
          </p>
        </motion.div>

        {/* Testimonial card */}
        {/* TODO: Replace with real testimonial(s) when available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card p-6 max-w-2xl mx-auto"
        >
          <Quote className="w-8 h-8 text-primary/30 mb-3" />
          <blockquote className="text-white text-lg font-medium leading-relaxed mb-4">
            &ldquo;Voorheen was ik 1–2 uur bezig per offerte. Nu heb ik in 10
            minuten een professionele PDF klaar, inclusief materiaallijst. En ik
            vergeet geen klein materiaal meer.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            {/* TODO: Add real avatar image */}
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              J
            </div>
            <div>
              {/* TODO: Replace with real name and trade */}
              <p className="text-white font-semibold text-sm">
                Jan, Timmerman
              </p>
              <p className="text-gray-500 text-xs">Nederland</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
