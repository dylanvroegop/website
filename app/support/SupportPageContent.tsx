"use client";

import { ArrowRight, MessageSquare, Upload, Sparkles, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";
import { CTASection } from "@/components/ui/CTASection";
import { siteCopy } from "@/content/copy";

const supportIcons = [MessageSquare, Upload, Sparkles];
const supportScreenshots = [
  "/screenshots/support/feedback.png",
  "/screenshots/support/prijs-import.png",
  "/screenshots/support/nieuw.png",
];

export function SupportPageContent() {
  const { support } = siteCopy;

  return (
    <>
      <PageHeader
        title={support.title}
        subtitle={support.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Support" },
        ]}
      />

      <section className="py-16 lg:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {support.options.map((option, i) => {
              const Icon = supportIcons[i];
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass-card overflow-hidden group"
                >
                  <ScreenshotViewer
                    src={supportScreenshots[i]}
                    alt={`OfferteHulp - ${option.title}`}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {option.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {option.description}
                    </p>
                    <span className="inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all cursor-pointer">
                      {option.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-12 lg:py-16 bg-black border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Andere vragen?
            </h2>
            <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white font-medium">
                    {support.contact.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Reactietijd</p>
                  <p className="text-white font-medium">
                    {support.contact.responseTime}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Klaar om te starten?"
        subtitle="Plan een demo of start direct je proefperiode"
        primaryCTA="Plan een demo"
        primaryHref="/contact"
        secondaryCTA="Start proefperiode"
        secondaryHref="/contact"
        variant="compact"
      />
    </>
  );
}
