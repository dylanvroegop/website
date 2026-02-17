"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forItems = [
  "Timmerman, klusbedrijf of renovatiebedrijf",
  "Maakt regelmatig offertes en wil sneller",
  "Wil strak offreren en marge borgen",
  "ZZP'er of klein team (1–5 man)",
];

const notForItems = [
  "Grote aannemers met eigen ERP-systeem",
  "Wie alles handmatig wil blijven doen",
  "Wie zelden of nooit offertes maakt",
];

export function ForWhoSection() {
  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Is Calvora iets voor jou?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Wel voor jou
            </p>
            <ul className="space-y-3">
              {forItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6"
          >
            <p className="text-sm font-medium text-red-400 uppercase tracking-wider mb-4">
              Niet voor jou
            </p>
            <ul className="space-y-3">
              {notForItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-400">
                  <X className="w-4 h-4 text-red-400/60 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
