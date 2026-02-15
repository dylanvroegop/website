"use client";

import {
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const painCards = [
  {
    icon: Clock,
    problem: "1–2 uur kwijt aan één offerte",
    solution: "Maak offertes in 5–10 minuten met de 6-stappen wizard",
  },
  {
    icon: AlertTriangle,
    problem: "Meerwerk vergeten = marge weg",
    solution: "Werkpakketten en overhead automatisch meegenomen",
  },
  {
    icon: FileSpreadsheet,
    problem: "Excel-chaos en rekenfouten",
    solution: "Gestructureerde calculatie, altijd correct",
  },
  {
    icon: TrendingDown,
    problem: "Prijzen niet up-to-date, winst onduidelijk",
    solution: "Actuele materiaalprijzen en real-time winstinzicht",
  },
];

export function PainSection() {
  return (
    <section className="py-20 lg:py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Herken je dit?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            De meeste vakmensen verliezen tijd en geld aan offertechaos. Calvora
            maakt daar een einde aan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-red-400/80 font-medium mb-2 line-through decoration-red-400/40">
                      {item.problem}
                    </p>
                    <p className="text-white font-semibold flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
