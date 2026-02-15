"use client";

import { useEffect, useRef, useCallback } from "react";
import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PDF_PATH = "/Offerte-260191.pdf";

interface ExampleOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExampleOfferModal({ isOpen, onClose }: ExampleOfferModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Voorbeeld offerte bekijken"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl h-[90vh] flex flex-col glass-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
              <h3 className="text-lg font-bold text-white">
                Voorbeeld offerte
              </h3>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded PDF */}
            <div className="flex-1 min-h-0">
              <iframe
                src={PDF_PATH}
                title="Voorbeeld offerte PDF"
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 p-4 border-t border-white/10 shrink-0">
              <a
                href={PDF_PATH}
                download="Calvora-Voorbeeld-Offerte.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-6 py-3 rounded-lg font-bold transition-all emerald-glow"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <a
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors"
              >
                Plan een demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
