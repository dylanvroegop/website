"use client";

import { HeroSection } from "@/components/marketing/HeroSection";
import { ProofStripSection } from "@/components/marketing/ProofStripSection";
import { PainSection } from "@/components/marketing/PainSection";
import { WeaponSection } from "@/components/marketing/WeaponSection";

import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { PricingTeaserSection } from "@/components/marketing/PricingTeaserSection";
import { ForWhoSection } from "@/components/marketing/ForWhoSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProofStripSection />
      <PainSection />
      <WeaponSection />

      <HowItWorksSection />
      <PricingTeaserSection />
      <ForWhoSection />
      <FAQSection />
      <FinalCtaSection />
    </>
  );
}
