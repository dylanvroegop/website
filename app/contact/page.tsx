import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact & Demo",
  description:
    "Plan een demo of start direct je 14-daagse proefperiode. Geen creditcard vereist, volledige functionaliteit, persoonlijke onboarding.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
