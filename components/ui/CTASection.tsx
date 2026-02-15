"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryCTA: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
  benefits?: string[];
  variant?: "default" | "compact";
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryCTA,
  primaryHref = "/contact",
  secondaryCTA,
  secondaryHref = "/contact",
  benefits,
  variant = "default",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "default" ? "py-20 lg:py-32" : "py-12 lg:py-16",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={cn(
              "font-bold text-white mb-4",
              variant === "default"
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-2xl md:text-3xl"
            )}
          >
            {title}
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow"
            >
              {primaryCTA}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            {secondaryCTA && (
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
              >
                {secondaryCTA}
              </a>
            )}
          </div>

          {benefits && benefits.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              {benefits.map((benefit, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {benefit}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
