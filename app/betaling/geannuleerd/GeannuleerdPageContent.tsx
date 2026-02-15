"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowRight } from "lucide-react";

export function GeannuleerdPageContent() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Betaling geannuleerd
          </h1>
          <p className="text-gray-400 mb-8">
            Je betaling is niet afgerond. Geen zorgen, er is niets in rekening
            gebracht. Je kunt het opnieuw proberen wanneer je wilt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/prijzen"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-3.5 rounded-lg font-bold transition-all emerald-glow"
            >
              Terug naar prijzen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
            >
              Hulp nodig?
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
