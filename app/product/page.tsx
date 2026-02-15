import type { Metadata } from "next";
import { ProductPageContent } from "./ProductPageContent";

export const metadata: Metadata = {
  title: "Complete offerte-software voor professionals",
  description:
    "Alle tools die je nodig hebt voor calculatie, projectbeheer en facturatie. Van materialen tot winst monitoring.",
};

export default function ProductPage() {
  return <ProductPageContent />;
}
