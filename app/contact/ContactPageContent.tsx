"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { siteCopy } from "@/content/copy";

export function ContactPageContent() {
  const { contact } = siteCopy;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title={contact.title}
        subtitle={contact.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-16 lg:py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Demo Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {contact.demo.title}
              </h2>
              <p className="text-gray-400 mb-6">{contact.demo.description}</p>

              {formSubmitted ? (
                <div className="glass-card p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Bedankt voor je aanvraag!
                  </h3>
                  <p className="text-gray-400">
                    We nemen binnen 24 uur contact op om een demo in te plannen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="naam"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      {contact.demo.fields.naam}
                    </label>
                    <input
                      type="text"
                      id="naam"
                      name="naam"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Jouw naam"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bedrijfsnaam"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      {contact.demo.fields.bedrijfsnaam}
                    </label>
                    <input
                      type="text"
                      id="bedrijfsnaam"
                      name="bedrijfsnaam"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Je bedrijfsnaam"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      {contact.demo.fields.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="naam@bedrijf.nl"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefoonnummer"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      {contact.demo.fields.telefoonnummer}
                    </label>
                    <input
                      type="tel"
                      id="telefoonnummer"
                      name="telefoonnummer"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="06 12345678"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bericht"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      {contact.demo.fields.bericht}
                    </label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                      placeholder="Heb je specifieke vragen of wensen?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-primary text-white hover:brightness-110 px-8 py-4 rounded-lg text-lg font-bold transition-all emerald-glow flex items-center justify-center gap-2"
                  >
                    {contact.demo.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Trial CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div className="glass-card p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {contact.trial.title}
                </h2>
                <p className="text-gray-400 mb-6">
                  {contact.trial.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {contact.trial.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className="group w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-all"
                >
                  {contact.trial.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust elements */}
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  {contact.trust.privacy}
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  {contact.trust.gdpr}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  {contact.trust.hosting}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
