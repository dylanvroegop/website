"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  screenshot: string;
  features: string[];
  progress: number;
  isActive?: boolean;
  className?: string;
}

export function StepCard({
  number,
  title,
  description,
  screenshot,
  features,
  progress,
  isActive = false,
  className,
}: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "glass-card overflow-hidden transition-all duration-300",
        isActive && "emerald-glow border-primary/30",
        className
      )}
    >
      {/* Progress bar */}
      <div className="h-1 bg-white/5">
        <div
          className="h-full gradient-emerald transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6 lg:p-8">
        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
              {number}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Stap {number} van 6
              </p>
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
          </div>

          <p className="text-gray-400 mb-5 leading-relaxed">{description}</p>

          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-dark-surface border border-white/5">
          <Image
            src={screenshot}
            alt={`OfferteHulp Calculatie Stap ${number} - ${title}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </motion.div>
  );
}
