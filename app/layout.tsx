import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Calvora - Offerte-software voor timmerbedrijven",
    template: "%s | Calvora",
  },
  description:
    "Maak professionele offertes in 6 stappen. Beheer projecten, facturen en winst in één platform. Speciaal voor timmerbedrijven en aannemers.",
  keywords: [
    "offerte software",
    "calculatie software",
    "bouwsoftware",
    "timmerbedrijf software",
    "aannemer software",
    "facturen",
    "projectbeheer bouw",
  ],
  authors: [{ name: "Calvora" }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Calvora",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Ga naar inhoud
        </a>
        <AuthProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
