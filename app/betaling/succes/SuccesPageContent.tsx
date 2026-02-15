"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function SuccesContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Betaling gelukt!
          </h1>
          <p className="text-gray-400 mb-8">
            Je abonnement is succesvol geactiveerd. Je ontvangt een
            bevestiging per e-mail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.calvora.nl"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-3.5 rounded-lg font-bold transition-all emerald-glow"
            >
              Inloggen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
            >
              Terug naar home
            </a>
          </div>

          {sessionId && (
            <p className="mt-8 text-xs text-gray-600 break-all">
              Referentie: {sessionId}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function SuccesPageContent() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[80vh] flex items-center justify-center">
          <p className="text-gray-400">Laden...</p>
        </section>
      }
    >
      <SuccesContent />
    </Suspense>
  );
}
