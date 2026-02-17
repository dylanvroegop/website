"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const painPoints = [
  "Je bent 's avonds nog offertes aan het tikken terwijl je eigenlijk klaar wil zijn.",
  "Je vergeet klein materiaal → je marge verdwijnt.",
  "Je prijs is gebaseerd op een oude Excel → te laag of te hoog.",
  "Je offerted 1 uur en wint de klus niet eens.",
  "Je ziet pas achteraf dat je eigenlijk te goedkoop zat.",
];

export function PainSection() {
  return (
    <section className="py-16 lg:py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Herken je dit?
          </h2>
        </motion.div>

        <ul className="space-y-4 mb-10">
          {painPoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-3 text-base sm:text-lg text-gray-300"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
              {point}
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-lg sm:text-xl font-semibold text-primary"
        >
          Als je dit herkent: Calvora is gemaakt om dit onmogelijk te maken.
        </motion.p>
      </div>
    </section>
  );
}
