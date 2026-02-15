import type { Metadata } from "next";
import { GeannuleerdPageContent } from "./GeannuleerdPageContent";

export const metadata: Metadata = {
  title: "Betaling geannuleerd",
  description: "De betaling is geannuleerd.",
};

export default function GeannuleerdPage() {
  return <GeannuleerdPageContent />;
}
