import type { Metadata } from "next";
import { SupportPageContent } from "./SupportPageContent";

export const metadata: Metadata = {
  title: "Support & Updates",
  description:
    "Feedback geven, prijsimport aanvragen, of de roadmap bekijken. We helpen je graag verder.",
};

export default function SupportPage() {
  return <SupportPageContent />;
}
