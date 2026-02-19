"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { LogIn, ArrowRight, AlertCircle } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const next = searchParams.get("next") || "/prijzen";
  const plan = searchParams.get("plan");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect immediately
  useEffect(() => {
    if (!authLoading && user) {
      const redirect = plan ? `${next}?plan=${plan}` : next;
      router.replace(redirect);
    }
  }, [authLoading, user, next, plan, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const redirect = plan ? `${next}?plan=${plan}` : next;
      router.replace(redirect);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Ongeldig e-mailadres of wachtwoord.");
          break;
        case "auth/too-many-requests":
          setError("Te veel pogingen. Probeer het later opnieuw.");
          break;
        default:
          setError("Er ging iets mis. Probeer het opnieuw.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Don't render form if already authenticated (will redirect)
  if (!authLoading && user) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-400">Je wordt doorgestuurd...</p>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-white/10 rounded-2xl p-8 glass-card"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Log in om door te gaan
            </h1>
            <p className="text-gray-400 text-sm">
              Log in met je Calvora-account om door te gaan naar betaling.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="jouw@email.nl"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1.5"
              >
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="Je wachtwoord"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-white hover:brightness-110 px-6 py-3.5 rounded-lg font-bold transition-all emerald-glow disabled:opacity-70 disabled:cursor-wait"
            >
              {loading ? "Bezig met inloggen..." : "Inloggen"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              Nog geen account?{" "}
              <a
                href="https://app.calvora.nl/register"
                className="text-primary hover:underline font-medium"
              >
                Registreer in de app
              </a>
            </p>
          </div>

          {/* Info note */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Na betaling word je teruggestuurd naar de app.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
