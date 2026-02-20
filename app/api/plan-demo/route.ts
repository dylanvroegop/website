import { NextRequest, NextResponse } from "next/server";

const DEFAULT_WEBHOOK_URL = "https://n8n.dylan8n.org/webhook-test/plan-demo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const naam = typeof body?.naam === "string" ? body.naam.trim() : "";
    const bedrijfsnaam =
      typeof body?.bedrijfsnaam === "string" ? body.bedrijfsnaam.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const telefoonnummer =
      typeof body?.telefoonnummer === "string"
        ? body.telefoonnummer.trim()
        : "";
    const bericht = typeof body?.bericht === "string" ? body.bericht.trim() : "";

    if (!naam || !bedrijfsnaam || !email) {
      return NextResponse.json(
        { error: "Naam, bedrijfsnaam en e-mail zijn verplicht." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_PLAN_DEMO_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
    const secretHeader = process.env.N8N_PLAN_DEMO_SECRET_HEADER || "secret";
    const secretValue =
      process.env.N8N_HEADER_SECRET ||
      process.env.N8N_PLAN_DEMO_SECRET ||
      process.env.N8N_WEBHOOK_SECRET ||
      process.env.WEBHOOK_SECRET ||
      "secret";

    const payload = {
      naam,
      bedrijfsnaam,
      email,
      telefoonnummer,
      bericht,
      source: "calvora-contact-form",
      submittedAt: new Date().toISOString(),
    };

    const candidateUrls = [webhookUrl];
    if (webhookUrl.includes("/webhook-test/")) {
      candidateUrls.push(webhookUrl.replace("/webhook-test/", "/webhook/"));
    }

    let delivered = false;
    const failures: Array<{ url: string; status: number; body: string }> = [];

    for (const url of candidateUrls) {
      const n8nResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [secretHeader]: secretValue,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (n8nResponse.ok) {
        delivered = true;
        break;
      }

      failures.push({
        url,
        status: n8nResponse.status,
        body: (await n8nResponse.text()).slice(0, 500),
      });
    }

    if (!delivered) {
      console.error("Plan demo webhook failed", { failures });
      const lastFailure = failures[failures.length - 1];
      const devDetails =
        process.env.NODE_ENV === "production"
          ? undefined
          : {
              upstreamStatus: lastFailure?.status ?? null,
              upstreamBody: lastFailure?.body ?? null,
              attemptedUrls: failures.map((f) => f.url),
            };
      return NextResponse.json(
        {
          error: "Kon demo-aanvraag niet versturen. Probeer het opnieuw.",
          details: devDetails,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Plan demo API error", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van je aanvraag." },
      { status: 500 }
    );
  }
}
