"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Werkt dit met mijn eigen prijzen?",
    a: "Ja. Je uploadt je eigen prijslijst als CSV, of je begint met onze standaardprijzen en past ze aan. Jouw prijzen, jouw marges.",
  },
  {
    q: "Is dit ingewikkeld?",
    a: "Nee. De wizard leidt je stap voor stap. Maten invullen, werkwijze kiezen, en Calvora doet de rest. Geen handleiding nodig.",
  },
  {
    q: "Wat als mijn klus afwijkt van de standaard?",
    a: "Je kunt alles aanpassen: extra regels toevoegen, materialen wijzigen, hoeveelheden aanpassen. Calvora is een hulpmiddel, geen keurslijf.",
  },
  {
    q: "Kan ik het ook gebruiken zonder CSV?",
    a: "Ja. Je kunt direct starten met standaardprijzen en die later aanpassen of je eigen prijslijst uploaden.",
  },
  {
    q: "Hoe zit het met btw / zakelijk / particulier?",
    a: "Calvora ondersteunt offertes voor zowel zakelijke als particuliere klanten. BTW-berekening wordt automatisch meegenomen.",
  },
  {
    q: "Kan ik exporteren / PDF in eigen huisstijl?",
    a: "Ja. Professionele PDF's met jouw logo, bedrijfsgegevens en handtekening. Direct klaar om te mailen.",
  },
  {
    q: "Hoe snel kan ik starten?",
    a: "Binnen 10 minuten. Account aanmaken, eventueel prijslijst uploaden, en je eerste offerte maken.",
  },
  {
    q: "Wat kost het en kan ik opzeggen?",
    a: "Vanaf €99,99 per maand (excl. BTW). 14 dagen gratis proberen, geen creditcard nodig. Maandelijks opzegbaar.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Veelgestelde vragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
