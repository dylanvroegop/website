"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { modules } from "@/content/modules";
import { siteCopy } from "@/content/copy";

const filters = [
  { key: "all", label: "Alles" },
  { key: "core", label: "Offertes" },
  { key: "management", label: "Beheer" },
  { key: "support", label: "Overig" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function ModulesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const { moduleShowcase } = siteCopy;

  const filteredModules =
    activeFilter === "all"
      ? modules
      : modules.filter((m) => m.category === activeFilter);

  return (
    <section className="py-20 lg:py-28 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {moduleShowcase.title}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {moduleShowcase.subtitle}
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              aria-pressed={activeFilter === filter.key}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, i) => (
            <ModuleCard
              key={module.id}
              name={module.name}
              slug={module.slug}
              icon={module.icon}
              description={module.description}
              screenshot={module.screenshot}
              route={module.route}
              index={i}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/modules"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            {moduleShowcase.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
