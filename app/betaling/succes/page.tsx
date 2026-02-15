import type { Metadata } from "next";
import { SuccesPageContent } from "./SuccesPageContent";

export const metadata: Metadata = {
  title: "Betaling gelukt",
  description: "Je betaling is succesvol verwerkt.",
};

export default function SuccesPage() {
  return <SuccesPageContent />;
}
