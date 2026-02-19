import type { Metadata } from "next";
import { CheckoutPageContent } from "./CheckoutPageContent";

export const metadata: Metadata = {
  title: "Afrekenen",
  description: "Rond je bestelling af en activeer je Calvora abonnement.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
