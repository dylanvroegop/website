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
    const { plan, customerDetails } = body;

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

    const stripe = getStripe();

    // --- Find or create Stripe Customer ---
    const customerEmail = customerDetails?.email || email;
    let customer: Stripe.Customer | undefined;

    // Search for existing customer by email
    if (customerEmail) {
      const existing = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });
      if (existing.data.length > 0) {
        customer = existing.data[0];
      }
    }

    const customerData: Stripe.CustomerCreateParams = {
      email: customerEmail,
      name: [customerDetails?.firstName, customerDetails?.lastName]
        .filter(Boolean)
        .join(" ") || undefined,
      metadata: { firebaseUid: uid },
    };

    // Add address if provided
    if (customerDetails?.street || customerDetails?.postalCode) {
      customerData.address = {
        line1: [customerDetails.street, customerDetails.houseNumber]
          .filter(Boolean)
          .join(" ") || undefined,
        postal_code: customerDetails.postalCode || undefined,
        city: customerDetails.city || undefined,
        country: customerDetails.country || "NL",
      };
    }

    if (customerDetails?.phone) {
      customerData.phone = customerDetails.phone;
    }

    if (customer) {
      customer = await stripe.customers.update(customer.id, customerData);
    } else {
      customer = await stripe.customers.create(customerData);
    }

    // --- Create Subscription ---
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        firebaseUid: uid,
        plan,
      },
      expand: ["latest_invoice.payment_intent"],
    });

    // Determine client_secret:
    // - No trial → PaymentIntent on the invoice
    // - Trial → no PaymentIntent, so create a SetupIntent to save payment method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = subscription.latest_invoice as any;
    const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent | undefined;

    let clientSecret: string | undefined;
    let intentType: "payment" | "setup" = "payment";

    if (paymentIntent?.client_secret) {
      clientSecret = paymentIntent.client_secret;
      intentType = "payment";
    } else {
      // Trial subscription — create a SetupIntent to collect payment method
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        metadata: {
          firebaseUid: uid,
          subscriptionId: subscription.id,
        },
      });
      clientSecret = setupIntent.client_secret!;
      intentType = "setup";
    }

    const keyPrefix =
      process.env.STRIPE_SECRET_KEY?.substring(0, 7) ?? "unknown";

    console.log("[Stripe Subscription] Created", {
      plan,
      subscriptionId: subscription.id,
      customerId: customer.id,
      intentType,
      uid,
      mode: keyPrefix,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret,
      intentType,
    });
  } catch (err) {
    console.error("Stripe subscription error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis bij het aanmaken van het abonnement." },
      { status: 500 }
    );
  }
}
