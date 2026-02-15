"use client";

import { cn } from "@/lib/utils";
import {
  Calculator,
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  Users,
  Package,
  Workflow,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  Users,
  Package,
  Workflow,
  Briefcase,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
  index?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
  index = 0,
}: FeatureCardProps) {
  const Icon = iconMap[icon] || Calculator;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "glass-card p-6 group hover:emerald-glow transition-all duration-300",
        "hover:border-primary/30",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
