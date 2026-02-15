"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { CTASection } from "@/components/ui/CTASection";
import { modules } from "@/content/modules";

export function ModulesPageContent() {
  return (
    <>
      <PageHeader
        title="Alle modules"
        subtitle="11 krachtige modules voor het complete calculatie- en beheerproces"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Modules" },
        ]}
      />

      <section className="py-16 lg:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Core modules */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Calculatie & Beheer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter((m) => m.category === "core")
                .map((module, i) => (
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
          </div>

          {/* Management modules */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Projectbeheer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter((m) => m.category === "management")
                .map((module, i) => (
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
          </div>

          {/* Support modules */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Administratie & Instellingen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter((m) => m.category === "support")
                .map((module, i) => (
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
          </div>
        </div>
      </section>

      <CTASection
        title="Klaar om te starten?"
        subtitle="Plan een demo of start direct je proefperiode"
        primaryCTA="Plan een demo"
        primaryHref="/contact"
        secondaryCTA="Start proefperiode"
        secondaryHref="/contact"
        benefits={["Geen creditcard vereist", "14 dagen gratis", "Volledige functionaliteit"]}
      />
    </>
  );
}
