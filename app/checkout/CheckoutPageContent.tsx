"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCheckoutProfile } from "@/lib/useCheckoutProfile";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Plan data (mirrored from pricing page)                             */
/* ------------------------------------------------------------------ */

const planDetails: Record<
  string,
  { name: string; monthlyPrice: string; monthlyPriceNum: number; firstPaymentNum?: number }
> = {
  zzp: {
    name: "ZZP Pakket",
    monthlyPrice: "99,99",
    monthlyPriceNum: 99.99,
    firstPaymentNum: 399.98,
  },
  pro: { name: "Pro Pakket", monthlyPrice: "174,99", monthlyPriceNum: 174.99 },
};

/* ------------------------------------------------------------------ */
/*  Order Summary Sidebar                                              */
/* ------------------------------------------------------------------ */

function OrderSummary({ plan }: { plan: string }) {
  const details = planDetails[plan];
  if (!details) return null;

  const todayPaymentNum = details.firstPaymentNum ?? details.monthlyPriceNum;
  const todayPayment = todayPaymentNum.toFixed(2).replace(".", ",");
  const inclBtw = (todayPaymentNum * 1.21).toFixed(2).replace(".", ",");
  const isIntroPayment = typeof details.firstPaymentNum === "number";
  const onboardingNum = isIntroPayment
    ? Number((todayPaymentNum - details.monthlyPriceNum).toFixed(2))
    : 0;
  const onboarding = onboardingNum.toFixed(2).replace(".", ",");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Besteloverzicht</h3>

      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium text-white">{details.name}</p>
        </div>
        <span className="text-white font-semibold whitespace-nowrap">
          &euro; {todayPayment}
        </span>
      </div>

      {isIntroPayment ? (
        <div className="text-xs text-gray-400 space-y-2">
          <p>
            Eenmalige implementatie en opstartkosten:{" "}
            <span className="text-white font-semibold">&euro; {onboarding}</span>
          </p>
          <p>
            Eerste maand abonnement:{" "}
            <span className="text-white font-semibold">&euro; {details.monthlyPrice}</span>
          </p>
          <p className="text-gray-500">
            Inclusief technische configuratie, instellingen optimaliseren en persoonlijke onboarding.
          </p>
          <p className="text-gray-500">
            Vanaf volgende maand wordt het abonnement van{" "}
            <span className="font-semibold text-primary">&euro; {details.monthlyPrice}</span>{" "}
            maandelijks gefactureerd en is maandelijks opzegbaar.
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-1">
          Maandelijks abonnement, exclusief 21% btw.
        </p>
      )}

      <div className="border-t border-white/10 my-4" />

      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-white">Vandaag te betalen</span>
        <span className="text-2xl font-bold text-white">
          &euro; {todayPayment}
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

  const [creatingCheckout, setCreatingCheckout] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);

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

    if (!form.firstName || !form.email || !form.postalCode || !form.street || !form.city) {
      setApiError("Vul alle verplichte velden in.");
      return;
    }

    if (!agreedTerms) {
      setApiError("Je moet akkoord gaan met de voorwaarden om door te gaan.");
      return;
    }

    setCreatingCheckout(true);
    setApiError(null);

    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/stripe/checkout", {
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

      if (!data.url || typeof data.url !== "string") {
        setApiError("Kon Stripe checkout URL niet ophalen.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setApiError("Kan geen verbinding maken met de server.");
    } finally {
      setCreatingCheckout(false);
    }
  }

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
          <a href="/prijzen" className="text-primary hover:underline font-medium">
            Terug naar prijzen
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="relative py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="/prijzen"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Terug naar prijzen
        </a>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{details.name}</h1>
        <p className="text-gray-400 text-sm mb-8">Vul je gegevens in en rond je bestelling af.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          <div>
            <CustomerDetailsForm form={form} onChange={handleFieldChange} />

            <label className="flex items-start gap-3 mt-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 accent-emerald-500"
              />
              <span className="text-sm text-gray-400 leading-relaxed">
                Ik ga akkoord met de {" "}
                <a href="/algemene-voorwaarden" className="text-primary hover:underline">algemene voorwaarden</a>
                {" "}en de {" "}
                <a href="/productvoorwaarden" className="text-primary hover:underline">productvoorwaarden</a>
                . Je abonnement wordt zonder opzegging automatisch verlengd.
              </span>
            </label>

            {apiError && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {apiError}
              </div>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={creatingCheckout || profileLoading}
              className={cn(
                "w-full mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-bold transition-all",
                "bg-primary text-white hover:brightness-110 emerald-glow",
                (creatingCheckout || profileLoading) && "opacity-70 cursor-wait"
              )}
            >
              {creatingCheckout ? "Even geduld..." : "Doorgaan naar betaling"}
              {!creatingCheckout && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <OrderSummary plan={plan} />
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Veilige betaling — verbindingen zijn versleuteld met SSL.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Export with Suspense wrapper                                      */
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
