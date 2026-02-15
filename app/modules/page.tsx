import type { Metadata } from "next";
import { ModulesPageContent } from "./ModulesPageContent";

export const metadata: Metadata = {
  title: "Alle Modules",
  description:
    "Ontdek alle 11 modules van Calvora: Dashboard, Offertes, Facturen, Winst, Planning, Producten, Klanten, Urenregistratie, Notities, Archief en Instellingen.",
};

export default function ModulesPage() {
  return <ModulesPageContent />;
}
