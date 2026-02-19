import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, getPriceId, isValidPlan } from "@/lib/stripe";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    // --- Firebase Auth guard ---
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Je moet ingelogd zijn om af te rekenen." },
        { status: 401 }
      );
    }

    const idToken = authHeader.slice(7);
    let decodedToken;
    try {
      decodedToken = await verifyIdToken(idToken);
    } catch {
      return NextResponse.json(
        { error: "Ongeldige sessie. Log opnieuw in." },
        { status: 401 }
      );
    }

    const uid = decodedToken.uid;
    const email = decodedToken.email;

    // --- Plan validation ---
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

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `https://app.calvora.nl/login?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/prijzen`,
      client_reference_id: uid,
      metadata: {
        firebaseUid: uid,
      },
      subscription_data: {
        metadata: {
          firebaseUid: uid,
        },
      },
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await getStripe().checkout.sessions.create(sessionParams);

    // Determine key mode (test vs live) for logging — never log the full key
    const keyPrefix = process.env.STRIPE_SECRET_KEY?.substring(0, 7) ?? "unknown";

    console.log("[Stripe Checkout] Session created", {
      plan,
      sessionId: session.id,
      uid,
      mode: keyPrefix,
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
