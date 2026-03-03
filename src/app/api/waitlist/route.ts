import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    const normalized = normalizeEmail(email ?? "");

    if (!isValidEmail(normalized)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }


    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log('[ !!!serviceKey ]', serviceKey);


    if (!url || !serviceKey) {
      return NextResponse.json(
        { ok: false, message: "Server is not configured." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });

const { data: todos } = await supabase.from('waitlist').select()
console.log('[ !!!todos ]', todos);

    // Insert (idempotent по уникальному индексу на lower(email))
    const { error } = await supabase.from("waitlist").insert({ email: normalized });

    console.log('!!!', { error });

    // Если email уже есть — считаем это успехом (UX-friendly)
    if (error) {
      // Postgres unique violation
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === "23505") {
        return NextResponse.json({ ok: true });
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
