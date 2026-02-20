import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export type PlanId = "zzp" | "pro" | "enterprise";

export function getPriceId(plan: PlanId): string {
  const map: Record<PlanId, string | undefined> = {
    zzp: process.env.PRICE_ZZP_MONTHLY,
    pro: process.env.PRICE_PRO_MONTHLY,
    enterprise: process.env.PRICE_ENTERPRISE_MONTHLY,
  };
  return map[plan]!;
}

export function getOnboardingPriceId(plan: PlanId): string | undefined {
  if (plan === "zzp") return process.env.PRICE_ZZP_ONBOARDING;
  return undefined;
}

export function isValidPlan(plan: string): plan is PlanId {
  return plan === "zzp" || plan === "pro" || plan === "enterprise";
}
