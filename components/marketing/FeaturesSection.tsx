"use client";

import {
  ArrowRight,
  Workflow,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { siteCopy } from "@/content/copy";

const killerFeatures: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Workflow,
    title: "AI-calculaties + materiaallijsten",
    description:
      "Van klantgegevens tot complete materiaallijst in 6 stappen. Werkpakketten, custom materialen en automatische berekeningen — zodat je niets vergeet en altijd correct calculeert.",
  },
  {
    icon: TrendingUp,
    title: "Winstcontrole & nacalculatie",
    description:
      "Real-time dashboards met geprognotiseerde winst, openstaande facturen en te-laat-risico. Zie direct of een klus rendabel is voordat je de offerte verstuurt.",
  },
];

export function FeaturesSection() {
  const { features } = siteCopy;

  const supportingFeatures = features.items.filter(
    (item) =>
      !item.title.includes("6-stappen") && !item.title.includes("Winst")
  );

  return (
    <section className="py-20 lg:py-28 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {features.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        {/* Killer features — larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {killerFeatures.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 hover:emerald-glow hover:border-primary/30 transition-all duration-300 border border-primary/10"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting features — smaller grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supportingFeatures.map((item, i) => (
            <FeatureCard
              key={i}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={i + 2}
            />
          ))}
        </div>

        {/* Platform link */}
        <div className="mt-10 text-center">
          <a
            href="/product"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            Meer over het platform
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
