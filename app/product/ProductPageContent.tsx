"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";
import { CTASection } from "@/components/ui/CTASection";
import { siteCopy } from "@/content/copy";

export function ProductPageContent() {
  const { product } = siteCopy;

  return (
    <>
      <PageHeader
        title={product.title}
        subtitle={product.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform" },
        ]}
      />

      {/* Core Capabilities */}
      {product.capabilities.map((cap, i) => (
        <section
          key={i}
          className="py-16 lg:py-24 bg-black border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:[direction:rtl] md:*:[direction:ltr]" : ""
              }`}
            >
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  {cap.tagline}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {cap.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {cap.description}
                </p>
                <ul className="space-y-3">
                  {cap.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Screenshot */}
              <ScreenshotViewer
                src={cap.screenshot}
                alt={`OfferteHulp - ${cap.title}`}
              />
            </div>
          </div>
        </section>
      ))}

      {/* Tech Highlights */}
      <section className="py-16 lg:py-24 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {product.techHighlights.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.techHighlights.items.map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-4 flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Klaar om te starten?"
        subtitle="Ontdek alle modules of bekijk de workflow in actie"
        primaryCTA="Ontdek alle modules"
        primaryHref="/modules"
        secondaryCTA="Zie de workflow"
        secondaryHref="/workflow"
        variant="compact"
      />
    </>
  );
}
