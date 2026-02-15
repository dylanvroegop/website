import type { Metadata } from "next";
import { PrijzenPageContent } from "./PrijzenPageContent";

export const metadata: Metadata = {
  title: "Prijzen",
  description:
    "Kies het pakket dat bij jouw bedrijf past. Van ZZP tot Enterprise, Calvora groeit met je mee.",
};

export default function PrijzenPage() {
  return <PrijzenPageContent />;
}
