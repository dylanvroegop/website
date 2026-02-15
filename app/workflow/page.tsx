import type { Metadata } from "next";
import { WorkflowPageContent } from "./WorkflowPageContent";

export const metadata: Metadata = {
  title: "6-stappen Calculatie Workflow",
  description:
    "Maak accurate offertes met onze gestructureerde 6-stappen wizard: van klantinformatie tot professionele PDF. Voor timmerbedrijven en aannemers.",
};

export default function WorkflowPage() {
  return <WorkflowPageContent />;
}
