"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Sparkles, Building2 } from "lucide-react";

const plans = [
  {
    name: "ZZP Pakket",
    price: "99,99",
    pricePrefix: "",
    icon: Zap,
    description: "Voor zelfstandige vakmannen die hun offertes professioneel en winstgevend willen maken.",
    features: [
      "Automatische materiaalcalculatie",
      "Automatische klein-materiaal berekening",
      "Arbeidsuren berekening",
      "Transport kosten p/km automatisch berekend",
      "Geavanceerde marge & afrondregels",
      "Templates / werkwijzen per klus",
      "Meerwerk & wijzigings-offertes",
      "Nacalculatie overzicht (begroot vs. werkelijk)",
      "Leveranciers toevoegen via CSV",
      "Beperkt aantal website-imports per maand",
      "Tot \u00b150 automatische calculaties per maand",
      "1 gebruiker",
      "PDF offerte in eigen huisstijl",
    ],
    popular: false,
  },
  {
    name: "Pro Pakket",
    price: "174,99",
    pricePrefix: "",
    icon: Sparkles,
    description: "Voor vakmannen met personeel of hoge offerte-omzet.",
    features: [
      "Alles van ZZP",
      "Tot \u00b1150 automatische calculaties per maand",
      "Meerdere website-imports per maand",
      "Bulk leverancier-import per categorie",
      "Meerdere gebruikers (tot 3\u20134)",
      "Teamtoegang & rolverdeling",
      "Prioriteit verwerking calculaties",
      "Uitgebreidere marge-structuren per projecttype",
    ],
    popular: true,
  },
  {
    name: "Enterprise Pakket",
    price: "334,99",
    pricePrefix: "Vanaf ",
    icon: Building2,
    description: "Voor bedrijven die calculatie en planning volledig willen centraliseren.",
    features: [
      "Alles van Pro",
      "Onbeperkte calculaties (fair use)",
      "Onbeperkte prijsimports",
      "Onbeperkte gebruikers",
      "Custom workflows",
      "Dedicated onboarding",
      "SLA support",
      "API / integraties",
      "Maatwerk prijsafspraken",
    ],
    popular: false,
  },
];

export function PricingTeaserSection() {
  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Wat kost het?
          </h2>
          <p className="text-gray-400">
            Geen verborgen kosten, maandelijks opzegbaar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.popular
                    ? "border-primary/50 bg-primary/5 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
                    : "border-white/10 glass-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Populairste keuze
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      plan.popular
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <div className="mb-3">
                  {plan.pricePrefix && (
                    <span className="text-gray-400 text-sm">{plan.pricePrefix}</span>
                  )}
                  <span className="text-3xl font-extrabold text-white">
                    &euro;{plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/ maand</span>
                </div>

                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Alle prijzen zijn exclusief BTW. 14 dagen gratis proberen, geen creditcard vereist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
          >
            Start gratis proef
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/prijzen"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            Bekijk alle prijzen
          </a>
        </div>
      </div>
    </section>
  );
}
