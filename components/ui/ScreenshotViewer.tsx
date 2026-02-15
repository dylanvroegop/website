"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScreenshotViewerProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export function ScreenshotViewer({
  src,
  alt,
  caption,
  className,
  priority = false,
}: ScreenshotViewerProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("relative", className)}
    >
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-dark-surface">
        {/* Window chrome */}
        <div className="h-8 border-b border-white/10 bg-[#18181b] flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority={priority}
          />
        </div>
      </div>

      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
