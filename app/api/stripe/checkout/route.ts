import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPriceId, isValidPlan } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan } = body;

    if (!plan || !isValidPlan(plan)) {
      return NextResponse.json(
        { error: "Ongeldig pakket. Kies uit: zzp, pro, enterprise." },
        { status: 400 }
      );
    }

    const priceId = getPriceId(plan);

    if (!priceId) {
      console.error(`Missing price ID for plan: ${plan}`);
      return NextResponse.json(
        { error: "Prijsconfiguratie ontbreekt. Neem contact op met support." },
        { status: 500 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/betaling/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/betaling/geannuleerd`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmaken van de checkout sessie." },
      { status: 500 }
    );
  }
}
