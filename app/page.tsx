"use client";

import { HeroSection } from "@/components/marketing/HeroSection";
import { PainSection } from "@/components/marketing/PainSection";
import { ProofSection } from "@/components/marketing/ProofSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { ProcessSection } from "@/components/marketing/ProcessSection";
import { ModulesSection } from "@/components/marketing/ModulesSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <ProofSection />
      <FeaturesSection />
      <ProcessSection />
      <ModulesSection />
      <FinalCtaSection />
    </>
  );
}
