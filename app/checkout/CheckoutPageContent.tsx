"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Lock, ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCheckoutProfile } from "@/lib/useCheckoutProfile";
import { getStripePromise } from "@/lib/stripe-client";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Plan data (mirrored from pricing page)                             */
/* ------------------------------------------------------------------ */

const planDetails: Record<string, { name: string; price: string; priceNum: number }> = {
  zzp: { name: "ZZP Pakket", price: "99,99", priceNum: 99.99 },
  pro: { name: "Pro Pakket", price: "174,99", priceNum: 174.99 },
};

/* ------------------------------------------------------------------ */
/*  Checkout Form (inside Elements provider)                           */
/* ------------------------------------------------------------------ */

function CheckoutForm({
  plan,
  subscriptionId,
}: {
  plan: string;
  subscriptionId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const details = planDetails[plan];
  const btwAmount = (details.priceNum * 0.21).toFixed(2).replace(".", ",");
  const inclBtw = (details.priceNum * 1.21).toFixed(2).replace(".", ",");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!agreedTerms) {
      setError("Je moet akkoord gaan met de algemene voorwaarden.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${siteUrl}/betaling/succes?session_id=${subscriptionId}`,
      },
    });

    // If confirmPayment returns, it means there was an error
    // (successful payments redirect automatically)
    if (stripeError) {
      setError(stripeError.message || "Er ging iets mis met de betaling.");
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Payment Element */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          Hoe wil je betalen?
        </h3>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      {/* Order summary - mobile only (shown below payment on small screens) */}
      <div className="lg:hidden mt-8">
        <OrderSummary plan={plan} />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 mt-6 cursor-pointer group">
        <input
          type="checkbox"
          checked={agreedTerms}
          onChange={(e) => setAgreedTerms(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 accent-emerald-500"
        />
        <span className="text-sm text-gray-400 leading-relaxed">
          Ik ga akkoord met de{" "}
          <a href="/algemene-voorwaarden" className="text-primary hover:underline">
            algemene voorwaarden
          </a>{" "}
          en de{" "}
          <a href="/productvoorwaarden" className="text-primary hover:underline">
            productvoorwaarden
          </a>
          . Je abonnement wordt zonder opzegging automatisch verlengd.
        </span>
      </label>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !stripe}
        className={cn(
          "w-full mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold transition-all",
          "bg-primary text-white hover:brightness-110 emerald-glow",
          (submitting || !stripe) && "opacity-70 cursor-wait"
        )}
      >
        {submitting ? "Bezig met verwerken..." : "Afrekenen"}
        {!submitting && <ArrowRight className="w-5 h-5" />}
      </button>

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <Lock className="w-3.5 h-3.5" />
        <span>Veilige betaling — verbindingen zijn versleuteld met SSL.</span>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Order Summary Sidebar                                              */
/* ------------------------------------------------------------------ */

function OrderSummary({ plan }: { plan: string }) {
  const details = planDetails[plan];
  if (!details) return null;

  const inclBtw = (details.priceNum * 1.21).toFixed(2).replace(".", ",");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Besteloverzicht</h3>

      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium text-white">{details.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            Maandelijks abonnement, exclusief 21% btw.
          </p>
        </div>
        <span className="text-white font-semibold whitespace-nowrap">
          &euro; {details.price}
        </span>
      </div>

      <div className="border-t border-white/10 my-4" />

      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-white">Vandaag te betalen</span>
        <span className="text-2xl font-bold text-white">
          &euro; {details.price}
        </span>
      </div>

      <p className="text-right text-xs text-gray-500 mt-1">
        Bedrag incl. btw &euro; {inclBtw}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Customer Details Form                                              */
/* ------------------------------------------------------------------ */

function CustomerDetailsForm({
  form,
  onChange,
}: {
  form: Record<string, string>;
  onChange: (field: string, value: string) => void;
}) {
  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Jouw gegevens</h3>
      <div className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Voornaam</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Voornaam"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Achternaam</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Achternaam"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>E-mailadres</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="E-mailadres"
            className={inputClass}
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>Bedrijfsnaam</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="Bedrijfsnaam"
            className={inputClass}
          />
        </div>

        {/* Country */}
        <div>
          <label className={labelClass}>Land</label>
          <select
            value={form.country}
            onChange={(e) => onChange("country", e.target.value)}
            className={cn(inputClass, "appearance-none cursor-pointer")}
          >
            <option value="NL">Nederland</option>
            <option value="BE">België</option>
            <option value="DE">Duitsland</option>
          </select>
        </div>

        {/* Postcode + House number */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Postcode</label>
            <input
              type="text"
              value={form.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              placeholder="Postcode"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Huisnummer</label>
            <input
              type="text"
              value={form.houseNumber}
              onChange={(e) => onChange("houseNumber", e.target.value)}
              placeholder="Huisnummer"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Street + City */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Straat</label>
            <input
              type="text"
              value={form.street}
              onChange={(e) => onChange("street", e.target.value)}
              placeholder="Straat"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Plaats</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Plaats"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Telefoonnummer</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+31 6 12345678"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Checkout Content (reads search params)                        */
/* ------------------------------------------------------------------ */

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useCheckoutProfile(user);

  const plan = searchParams.get("plan") || "";
  const details = planDetails[plan];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    country: "NL",
    postalCode: "",
    houseNumber: "",
    street: "",
    city: "",
    phone: "",
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [creatingSubscription, setCreatingSubscription] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Pre-fill form from Firestore profile
  const [prefilled, setPrefilled] = useState(false);
  useEffect(() => {
    if (!profileLoading && profile && !prefilled) {
      setPrefilled(true);
      setForm((prev) => ({
        ...prev,
        firstName: profile.firstName || prev.firstName,
        lastName: profile.lastName || prev.lastName,
        email: profile.email || prev.email,
        companyName: profile.companyName || prev.companyName,
        postalCode: profile.postalCode || prev.postalCode,
        houseNumber: profile.houseNumber || prev.houseNumber,
        street: profile.street || prev.street,
        city: profile.city || prev.city,
        phone: profile.phone || prev.phone,
      }));
    }
  }, [profileLoading, profile, prefilled]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/inloggen?next=/checkout&plan=${plan}`);
    }
  }, [authLoading, user, plan, router]);

  function handleFieldChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleProceedToPayment() {
    if (!user || !details) return;

    // Basic validation
    if (!form.firstName || !form.email || !form.postalCode || !form.street || !form.city) {
      setApiError("Vul alle verplichte velden in.");
      return;
    }

    setCreatingSubscription(true);
    setApiError(null);

    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ plan, customerDetails: form }),
      });

      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || "Er ging iets mis. Probeer het opnieuw.");
        return;
      }

      setClientSecret(data.clientSecret);
      setSubscriptionId(data.subscriptionId);
    } catch {
      setApiError("Kan geen verbinding maken met de server.");
    } finally {
      setCreatingSubscription(false);
    }
  }

  // Loading states
  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400">Laden...</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Ongeldig pakket geselecteerd.</p>
          <a
            href="/prijzen"
            className="text-primary hover:underline font-medium"
          >
            Terug naar prijzen
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="relative py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <a
          href="/prijzen"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Terug naar prijzen
        </a>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {details.name}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Vul je gegevens in en rond je bestelling af.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Left column */}
          <div>
            <CustomerDetailsForm form={form} onChange={handleFieldChange} />

            {!clientSecret ? (
              <>
                {/* Error */}
                {apiError && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {apiError}
                  </div>
                )}

                {/* Proceed button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={creatingSubscription || profileLoading}
                  className={cn(
                    "w-full mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold transition-all",
                    "bg-primary text-white hover:brightness-110 emerald-glow",
                    (creatingSubscription || profileLoading) && "opacity-70 cursor-wait"
                  )}
                >
                  {creatingSubscription
                    ? "Even geduld..."
                    : "Doorgaan naar betaling"}
                  {!creatingSubscription && <ArrowRight className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <Elements
                stripe={getStripePromise()}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#10b981",
                      colorBackground: "#0a0a0a",
                      colorText: "#ffffff",
                      colorDanger: "#ef4444",
                      fontFamily: "system-ui, sans-serif",
                      borderRadius: "8px",
                      colorTextPlaceholder: "#4b5563",
                    },
                    rules: {
                      ".Input": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "none",
                      },
                      ".Input:focus": {
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                        boxShadow: "0 0 0 1px rgba(16, 185, 129, 0.3)",
                      },
                      ".Tab": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      },
                      ".Tab--selected": {
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                      },
                      ".Label": {
                        color: "#9ca3af",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm plan={plan} subscriptionId={subscriptionId!} />
              </Elements>
            )}
          </div>

          {/* Right column - Order summary (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <OrderSummary plan={plan} />

              {/* Security badge */}
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  Veilige betaling — verbindingen zijn versleuteld met SSL.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Export with Suspense wrapper                                        */
/* ------------------------------------------------------------------ */

export function CheckoutPageContent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-400">Laden...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
