import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export type PlanId = "zzp" | "pro" | "enterprise";

export const PRICE_IDS: Record<PlanId, string> = {
  zzp: process.env.PRICE_ZZP_MONTHLY!,
  pro: process.env.PRICE_PRO_MONTHLY!,
  enterprise: process.env.PRICE_ENTERPRISE_MONTHLY!,
};

export function isValidPlan(plan: string): plan is PlanId {
  return plan === "zzp" || plan === "pro" || plan === "enterprise";
}
