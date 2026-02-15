"use client";

import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { CTASection } from "@/components/ui/CTASection";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";
import { HeroDevices } from "@/components/ui/HeroDevices";
import { siteCopy } from "@/content/copy";
import { modules } from "@/content/modules";

export default function Home() {
  const { hero, problems, platform, features, workflowTeaser, moduleShowcase, finalCTA } = siteCopy;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,hsla(158,93%,40%,0.08),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 leading-none">
              Offertes in minuten.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
              Met AI-gestuurde calculaties.
            </p>

            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Calvora helpt je professionele offertes maken, klussen beheren en grip houden op je winst.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <a
                href="/contact"
                className="group bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow flex items-center justify-center gap-2"
              >
                {hero.primaryCTA}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/workflow"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                  <Play size={10} fill="white" className="ml-0.5" />
                </div>
                Bekijk workflow
              </a>
            </div>
          </motion.div>

          {/* Hero multi-device mockup */}
          <div className="mt-16 lg:mt-20">
            <HeroDevices />
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / SOLUTION ===== */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Herken je dit?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              De meeste timmerbedrijven worstelen met dezelfde problemen. Calvora lost ze op.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <p className="text-red-400/80 text-sm font-medium mb-2 line-through decoration-red-400/40">
                  {item.problem}
                </p>
                <p className="text-white font-semibold flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLATFORM OVERVIEW ===== */}
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
              {platform.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {platform.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platform.pillars.map((pillar, i) => (
              <FeatureCard
                key={i}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                index={i}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
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

      {/* ===== FEATURE HIGHLIGHTS ===== */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.items.map((item, i) => (
              <FeatureCard
                key={i}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW TEASER ===== */}
      <section className="py-20 lg:py-28 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {workflowTeaser.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {workflowTeaser.subtitle}
            </p>
          </motion.div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
            {workflowTeaser.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-400 hidden sm:inline">{step}</span>
                </div>
                {i < workflowTeaser.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                )}
              </div>
            ))}
          </div>

          {/* Workflow screenshot */}
          <ScreenshotViewer
            src="/screenshots/workflow/stap-4-materialen.png"
            alt="Calvora Calculatie Stap 4 - Materialen selecteren"
            caption="Stap 4: Stel je materiaallijst samen met werkpakketten of custom materialen"
          />

          <div className="mt-8 text-center">
            <a
              href="/workflow"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
            >
              {workflowTeaser.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== MODULE SHOWCASE ===== */}
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
              {moduleShowcase.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {moduleShowcase.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => (
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

      {/* ===== FINAL CTA ===== */}
      <CTASection
        title={finalCTA.title}
        subtitle={finalCTA.subtitle}
        primaryCTA={finalCTA.primaryCTA}
        primaryHref="/contact"
        secondaryCTA={finalCTA.secondaryCTA}
        secondaryHref="/contact"
        benefits={finalCTA.benefits}
      />
    </>
  );
}
