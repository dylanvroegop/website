"use client";

import { motion } from "framer-motion";
import { ListChecks, Database, FileOutput } from "lucide-react";

const cards: {
  icon: typeof ListChecks;
  title: string;
  description: string;
  example?: string;
}[] = [
  {
    icon: ListChecks,
    title: "Geleid invulproces",
    description:
      "Van maten naar werkwijze naar materiaal. Stap voor stap, niets vergeten.",
  },
  {
    icon: Database,
    title: "Prijzen ophalen, niet overtypen",
    description:
      "Geef aan bij welke leverancier je inkoopt — wij halen de publieke prijzen op en zetten ze klaar in je prijslijst. Geen account nodig, geen handmatig overtypen.",
    example:
      "Bijv. alle schroeven van Toolstation in één keer in je lijst, met actuele prijs.",
  },
  {
    icon: FileOutput,
    title: "Offerte + marge in één klik",
    description:
      "Werkomschrijving, materiaallijst, marge en professionele PDF. Klaar om te versturen.",
  },
];

export function WeaponSection() {
  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Wat Calvora voor je doet
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 hover:border-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
                {card.example && (
                  <p className="text-gray-500 text-xs mt-2 italic">
                    {card.example}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
