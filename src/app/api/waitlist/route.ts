import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const VALID_INTERESTS = new Set([
  "wallet-security",
  "defi-positions",
  "wallet-exposure",
  "protocol-risks",
  "other",
]);

export async function POST(req: Request) {
  try {
    const { email, interests, otherInterest } = (await req.json()) as {
      email?: string;
      interests?: unknown;
      otherInterest?: unknown;
    };
    const normalized = normalizeEmail(email ?? "");
    const selectedInterests = Array.isArray(interests)
      ? [...new Set(interests.filter((interest): interest is string =>
          typeof interest === "string" && VALID_INTERESTS.has(interest)
        ))]
      : [];
    const other =
      selectedInterests.includes("other") && typeof otherInterest === "string"
        ? otherInterest.trim().slice(0, 160)
        : null;

    if (!isValidEmail(normalized)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }


    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { ok: false, message: "Server is not configured." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

    const preferences = {
      wallet_security: selectedInterests.includes("wallet-security"),
      defi_positions: selectedInterests.includes("defi-positions"),
      wallet_exposure: selectedInterests.includes("wallet-exposure"),
      protocol_contract_risk: selectedInterests.includes("protocol-risks"),
      other,
    };

    // Insert, or refresh preferences when the email is already on the list.
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: normalized, ...preferences });

    // Если email уже есть — считаем это успехом (UX-friendly)
    if (error) {
      // Postgres unique violation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === "23505") {
        const { error: updateError } = await supabase
          .from("waitlist")
          .update(preferences)
          .eq("email", normalized);

        if (!updateError) {
          return NextResponse.json({ ok: true });
        }
      }

      return NextResponse.json(
        { ok: false, message: "Could not save email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}
