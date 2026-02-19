import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPageContent } from "./LoginPageContent";

export const metadata: Metadata = {
  title: "Inloggen | Calvora",
  description: "Log in om door te gaan naar betaling.",
};

export default function InloggenPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[80vh] flex items-center justify-center">
          <p className="text-gray-400">Laden...</p>
        </section>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
