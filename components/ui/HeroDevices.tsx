"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroDevices() {
  return (
    <div className="relative w-full max-w-6xl mx-auto" style={{ height: "clamp(320px, 50vw, 620px)" }}>
      {/* Desktop monitor - back center */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[65%] z-10"
      >
        <div className="rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
          {/* Monitor bezel top */}
          <div className="h-5 sm:h-6 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/screenshots/modules/Winst.png"
              alt="OfferteHulp - Winst dashboard"
              fill
              className="object-cover object-top blur-[2px]"
              sizes="(max-width: 768px) 65vw, 800px"
              priority
            />
            {/* Selective blur overlay for sensitive data */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Blur over specific financial amounts */}
              <div className="absolute top-[13%] left-[5%] w-[85%] h-[7%] backdrop-blur-md bg-black/20 rounded" />
            </div>
          </div>
        </div>
        {/* Monitor stand */}
        <div className="mx-auto w-[15%] h-4 sm:h-6 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b" />
        <div className="mx-auto w-[25%] h-1.5 sm:h-2 bg-[#1a1a1a] rounded-b-lg" />
      </motion.div>

      {/* Laptop - left */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-[5%] left-0 w-[48%] z-20"
      >
        <div className="relative">
          {/* Screen */}
          <div className="rounded-t-lg overflow-hidden border border-white/10 border-b-0 shadow-2xl bg-[#0a0a0a]">
            <div className="h-4 sm:h-5 bg-[#1a1a1a] border-b border-white/5 flex items-center px-2 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/screenshots/modules/Offertes.png"
                alt="OfferteHulp - Offertes overzicht"
                fill
                className="object-cover object-top blur-[1.5px]"
                sizes="(max-width: 768px) 48vw, 550px"
                priority
              />
              {/* Blur overlay for names/data */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[25%] left-[18%] w-[30%] h-[65%] backdrop-blur-md bg-black/15 rounded" />
              </div>
            </div>
          </div>
          {/* Laptop base/keyboard */}
          <div className="h-2 sm:h-3 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-lg border border-t-0 border-white/10">
            <div className="mx-auto w-[20%] h-0.5 sm:h-1 mt-0.5 bg-[#333] rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Tablet - right */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[5%] right-[2%] w-[30%] z-20"
      >
        <div className="rounded-xl overflow-hidden border-2 border-[#2a2a2a] shadow-2xl bg-[#0a0a0a]">
          {/* Tablet bezel */}
          <div className="p-1">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/screenshots/offerte-workspace/offerte-overzicht.png"
                alt="OfferteHulp - Offerte workspace"
                fill
                className="object-cover object-top blur-[1.5px]"
                sizes="(max-width: 768px) 30vw, 350px"
              />
              {/* Blur overlay for sensitive info */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[8%] left-[15%] w-[50%] h-[8%] backdrop-blur-md bg-black/20 rounded" />
                <div className="absolute top-[28%] left-[10%] w-[45%] h-[12%] backdrop-blur-md bg-black/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phone - center front */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-[20%] w-[18%] z-30"
      >
        <div className="rounded-2xl overflow-hidden border-2 border-[#2a2a2a] shadow-2xl bg-[#0a0a0a]">
          {/* Phone notch */}
          <div className="h-3 sm:h-4 bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-[40%] h-1 sm:h-1.5 bg-[#1a1a1a] rounded-full" />
          </div>
          <div className="px-0.5 pb-1">
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
              <Image
                src="/screenshots/modules/Facturen.png"
                alt="OfferteHulp - Facturen mobiel"
                fill
                className="object-cover object-top blur-[1.5px]"
                sizes="(max-width: 768px) 18vw, 200px"
              />
              {/* Blur overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[50%] h-[60%] backdrop-blur-md bg-black/15 rounded" />
              </div>
            </div>
          </div>
          {/* Home indicator */}
          <div className="h-2 sm:h-3 bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-[30%] h-0.5 sm:h-1 bg-[#333] rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Glow effect behind devices */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
