"use client";

import {
  CheckCircle2,
  ArrowRight,
  Database,
  Link2,
  LayoutDashboard,
  FileText,
  Receipt,
  TrendingUp,
  Calendar,
  Package,
  Users,
  Clock,
  StickyNote,
  Archive,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";
import { CTASection } from "@/components/ui/CTASection";
import { type Module, modules } from "@/content/modules";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Receipt,
  TrendingUp,
  Calendar,
  Package,
  Users,
  Clock,
  StickyNote,
  Archive,
  Settings,
};

export function ModuleDetailContent({ module }: { module: Module }) {
  const Icon = iconMap[module.icon] || LayoutDashboard;
  const relatedModules = module.relatedModules
    ? modules.filter((m) => module.relatedModules!.includes(m.slug))
    : [];

  return (
    <>
      <PageHeader
        title={module.name}
        subtitle={module.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Modules", href: "/modules" },
          { label: module.name },
        ]}
      >
        <div className="mt-4 flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </PageHeader>

      {/* Main Screenshot */}
      <section className="py-12 lg:py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScreenshotViewer
            src={module.screenshot}
            alt={`Calvora ${module.name} - ${module.description}`}
            priority
          />
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-12 lg:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Belangrijkste functies
              </h2>
              <ul className="space-y-3">
                {module.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* User Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Gebruiksscenario
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {module.userStory}
              </p>
            </motion.div>

            {/* Data & Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Data & Integratie
              </h2>

              {module.dataSource && module.dataSource.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Databronnen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {module.dataSource.map((source, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {relatedModules.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Gerelateerde modules
                  </p>
                  <div className="space-y-1">
                    {relatedModules.map((related) => (
                      <a
                        key={related.id}
                        href={related.route}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-primary transition-colors py-1"
                      >
                        <Link2 className="w-3 h-3" />
                        {related.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related modules */}
      {relatedModules.length > 0 && (
        <section className="py-12 lg:py-16 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              Gerelateerde modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedModules.slice(0, 3).map((related) => {
                const RelatedIcon = iconMap[related.icon] || LayoutDashboard;
                return (
                  <a
                    key={related.id}
                    href={related.route}
                    className="glass-card p-5 flex items-start gap-4 hover:emerald-glow hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <RelatedIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {related.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-primary font-medium gap-1 mt-2 group-hover:gap-2 transition-all">
                        Meer info
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Probeer deze module"
        subtitle={`Ontdek ${module.name} en alle andere modules in Calvora`}
        primaryCTA="Plan een demo"
        primaryHref="/contact"
        secondaryCTA="Start proefperiode"
        secondaryHref="/contact"
        variant="compact"
      />
    </>
  );
}
