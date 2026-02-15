"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroDevices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-5xl mx-auto"
    >
      <Image
        src="/hero-website-picture.png"
        alt="Calvora platform op desktop, laptop, tablet en mobiel"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    </motion.div>
  );
}
