"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { StepCard } from "@/components/ui/StepCard";
import { ScreenshotViewer } from "@/components/ui/ScreenshotViewer";
import { CTASection } from "@/components/ui/CTASection";
import { workflowSteps, workspaceTabs } from "@/content/workflow-steps";
import { siteCopy } from "@/content/copy";

export function WorkflowPageContent() {
  const { workflow } = siteCopy;

  return (
    <>
      <PageHeader
        title={workflow.title}
        subtitle={workflow.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/product" },
          { label: "Workflow" },
        ]}
      />

      {/* Step Navigator (sticky) */}
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto">
            {workflowSteps.map((step) => (
              <a
                key={step.number}
                href={`#stap-${step.number}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {step.number}
                </span>
                <span className="hidden md:inline">{step.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <section className="py-16 lg:py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {workflowSteps.map((step) => (
            <div key={step.number} id={`stap-${step.number}`} className="scroll-mt-40">
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
                screenshot={step.screenshot}
                features={step.features}
                progress={step.progress}
              />

              {/* Extra screenshots */}
              {step.extraScreenshots && step.extraScreenshots.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {step.extraScreenshots.map((extra, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: j * 0.1 }}
                      className="glass-card p-3"
                    >
                      <ScreenshotViewer
                        src={extra.image}
                        alt={`Calvora - ${extra.title}`}
                        caption={extra.title}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Offerte Workspace */}
      <section className="py-16 lg:py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {workflow.workspaceTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {workflow.workspaceDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceTabs.map((tab, i) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <ScreenshotViewer
                  src={tab.screenshot}
                  alt={`Calvora Offerte Workspace - ${tab.name}`}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {tab.name}
                  </h3>
                  <p className="text-sm text-gray-400">{tab.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {workflow.benefitsTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {workflow.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Klaar om de workflow te proberen?"
        subtitle="Plan een demo of start direct je proefperiode"
        primaryCTA="Plan een demo"
        primaryHref="/contact"
        secondaryCTA="Bekijk alle modules"
        secondaryHref="/modules"
        benefits={["Geen creditcard vereist", "14 dagen gratis", "Nederlandse support"]}
      />
    </>
  );
}
