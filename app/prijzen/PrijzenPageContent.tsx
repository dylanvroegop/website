"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/ui/CTASection";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const plans = [
  {
    id: "zzp" as const,
    name: "ZZP Pakket",
    price: "99,99",
    icon: Zap,
    description: "Perfect voor zelfstandige timmerlieden en kleine klussen.",
    features: [
      "Offertes maken in minuten",
      "Automatische materiaalberekening",
      "Professionele werkbeschrijvingen",
      "Basis marge-overzicht",
      "PDF-offertes in eigen huisstijl",
    ],
    cta: "Kies ZZP",
    popular: false,
  },
  {
    id: "pro" as const,
    name: "Pro Pakket",
    price: "174,99",
    icon: Sparkles,
    description: "Voor groeiende bedrijven die meer controle willen.",
    features: [
      "Alles van ZZP",
      "Geavanceerde marges & afrondregels",
      "Templates / werkwijzen per klus",
      "Meerwerk / wijzigingsoffertes",
      "Prioriteit support",
    ],
    cta: "Kies Pro",
    popular: true,
  },
  {
    id: "enterprise" as const,
    name: "Enterprise Pakket",
    price: "334,99",
    icon: Building2,
    description: "Voor teams met meerdere gebruikers en eigen wensen.",
    features: [
      "Alles van Pro",
      "Meerdere gebruikers (team)",
      "Eigen onboarding + migratie hulp",
      "Custom workflows & integraties",
      "SLA / dedicated support",
    ],
    cta: "Plan demo",
    popular: false,
  },
];

const faqs = [
  {
    q: "Kan ik tussentijds upgraden of downgraden?",
    a: "Ja, je kunt op elk moment wisselen van pakket. Bij een upgrade wordt het verschil pro-rata verrekend. Bij een downgrade gaat het nieuwe tarief in bij de volgende factuurdatum.",
  },
  {
    q: "Is er een proefperiode?",
    a: "Ja! Elk pakket heeft een gratis proefperiode van 14 dagen. Gedurende de proefperiode heb je toegang tot alle functies van het gekozen pakket. Je wordt pas na 14 dagen gefactureerd.",
  },
  {
    q: "Hoe werkt betaling?",
    a: "Je betaalt maandelijks via iDEAL of creditcard. Stripe verwerkt de betalingen veilig. Je kunt je abonnement op elk moment opzeggen.",
  },
  {
    q: "Wat als ik meer dan één gebruiker nodig heb?",
    a: "Het Enterprise pakket ondersteunt meerdere gebruikers. Heb je een groot team? Neem contact op voor een maatwerkofferte.",
  },
  {
    q: "Kan ik mijn data exporteren?",
    a: "Ja, je kunt al je offertes, facturen en klantgegevens exporteren als CSV of PDF. Je data is altijd van jou.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PrijzenPageContent() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout(planId: string) {
    // Enterprise → redirect to contact / demo
    if (planId === "enterprise") {
      window.location.href = "/contact";
      return;
    }

    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch {
      alert("Kan geen verbinding maken met de server. Probeer het later opnieuw.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <>
      {/* Hero */}
      <PageHeader
        title="Eenvoudige, transparante prijzen"
        subtitle="Kies het pakket dat bij jouw bedrijf past. Geen verborgen kosten, maandelijks opzegbaar."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Prijzen", href: "/prijzen" },
        ]}
      />

      {/* Pricing cards */}
      <section className="relative py-16 lg:py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-8",
                  plan.popular
                    ? "border-primary/50 bg-primary/5 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
                    : "border-white/10 glass-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Populairste keuze
                    </span>
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      plan.popular
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-gray-400"
                    )}
                  >
                    <plan.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-white">
                    &euro;{plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">/ maand</span>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className={cn(
                    "group w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition-all",
                    plan.popular
                      ? "bg-primary text-white hover:brightness-110 emerald-glow"
                      : "border border-white/10 text-white hover:bg-white/5",
                    loadingPlan === plan.id && "opacity-70 cursor-wait"
                  )}
                >
                  {loadingPlan === plan.id ? "Even geduld..." : plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Sub-note */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Alle prijzen zijn exclusief BTW. 14 dagen gratis proberen, geen
            creditcard vereist.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Veelgestelde vragen
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 shrink-0 transition-transform",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Nog vragen? Plan een demo"
        subtitle="We laten je graag zien hoe Calvora werkt voor jouw bedrijf."
        primaryCTA="Plan een demo"
        primaryHref="/contact"
        secondaryCTA="Neem contact op"
        secondaryHref="/contact"
        benefits={[
          "Persoonlijke rondleiding",
          "Geen verplichtingen",
          "Binnen 24 uur reactie",
        ]}
        variant="compact"
      />
    </>
  );
}
