"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LayoutDashboard,
  FileText,
  Receipt,
  TrendingUp,
  Calendar,
  Package,
  Users,
  Clock,
  StickyNote,
  Archive,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const moduleLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/modules/dashboard" },
  { name: "Offertes", icon: FileText, href: "/modules/offertes" },
  { name: "Facturen", icon: Receipt, href: "/modules/facturen" },
  { name: "Winst", icon: TrendingUp, href: "/modules/winst" },
  { name: "Planning", icon: Calendar, href: "/modules/planning" },
  { name: "Producten", icon: Package, href: "/modules/producten" },
  { name: "Klanten", icon: Users, href: "/modules/klanten" },
  { name: "Urenregistratie", icon: Clock, href: "/modules/urenregistratie" },
  { name: "Notities", icon: StickyNote, href: "/modules/notities" },
  { name: "Archief", icon: Archive, href: "/modules/archief" },
  { name: "Instellingen", icon: Settings, href: "/modules/instellingen" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex flex-col select-none group no-underline hover:opacity-90 transition-opacity">
            <span className="text-2xl font-black tracking-tight text-[hsl(158,93%,40%)] uppercase leading-none">
              CALVORA
            </span>
            <span className="text-[0.55rem] font-bold text-[hsl(158,93%,40%)] tracking-[0.2em] uppercase leading-none mt-1">
              BOUWSOFTWARE. CALCULATIE. WINST.
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="/"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Home
            </a>

            {/* Platform dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("platform")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                Platform
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    activeDropdown === "platform" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "platform" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-56 py-2 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl"
                  >
                    <a
                      href="/product"
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Platform overzicht
                    </a>
                    <a
                      href="/workflow"
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      6-stappen workflow
                    </a>
                    <a
                      href="/modules"
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Alle modules
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modules mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("modules")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                Modules
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    activeDropdown === "modules" && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "modules" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-20 mt-1 w-[420px] p-4 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {moduleLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-primary" />
                          {link.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <a
                        href="/modules"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        Bekijk alle modules
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/prijzen"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Prijzen
            </a>

            <a
              href="/support"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Support
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://app.calvora.nl/login"
              className="text-sm font-medium text-white hover:text-primary transition-colors px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
            >
              Inloggen
            </a>
            <a
              href="/contact"
              className="bg-primary text-white hover:brightness-110 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Plan demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <a
                href="/"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Home
              </a>
              <a
                href="/product"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Platform
              </a>
              <a
                href="/workflow"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Workflow
              </a>
              <a
                href="/modules"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Modules
              </a>
              <a
                href="/prijzen"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Prijzen
              </a>
              <a
                href="/support"
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Support
              </a>

              <div className="pt-4 flex flex-col gap-3 border-t border-white/10 mt-3">
                <a
                  href="https://app.calvora.nl/login"
                  className="w-full text-center text-white border border-white/10 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Inloggen
                </a>
                <a
                  href="/contact"
                  className="w-full text-center bg-primary text-white font-bold py-2.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  Plan demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
