import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

/**
 * Contact form endpoint. Sends mail through Resend (https://resend.com) using its REST API.
 *
 * Env:
 * - RESEND_API_KEY      (required to send)
 * - CONTACT_TO_EMAIL    (optional, defaults to siteConfig.email)
 * - CONTACT_FROM_EMAIL  (optional, defaults to Resend's onboarding sender; use a verified domain in production)
 *
 * Without RESEND_API_KEY it answers 503 and the form offers a prefilled mailto link instead.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  /** Honeypot: hidden field real visitors never fill. */
  company?: unknown;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots that fill the honeypot get a success response and nothing is sent.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [`Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null, "", message]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
