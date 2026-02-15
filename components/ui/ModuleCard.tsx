"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
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
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

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

interface ModuleCardProps {
  name: string;
  slug: string;
  icon: string;
  description: string;
  screenshot: string;
  route: string;
  className?: string;
  index?: number;
}

export function ModuleCard({
  name,
  icon,
  description,
  screenshot,
  route,
  className,
  index = 0,
}: ModuleCardProps) {
  const Icon = iconMap[icon] || LayoutDashboard;

  return (
    <motion.a
      href={route}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "glass-card group overflow-hidden hover:emerald-glow transition-all duration-300",
        "hover:border-primary/30 block",
        className
      )}
    >
      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-surface">
        <Image
          src={screenshot}
          alt={`OfferteHulp ${name} - ${description}`}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <span className="inline-flex items-center text-sm text-primary font-medium gap-1 group-hover:gap-2 transition-all">
          Meer informatie
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.a>
  );
}
