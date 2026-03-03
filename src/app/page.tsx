import Link from "next/link";

import WaitlistForm from "./waitlist-form";

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-neutral-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-neutral-600">{desc}</div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-white to-neutral-50 text-neutral-900">
      {/* background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 -top-50 h-130 w-130 rounded-full bg-indigo-200/60 blur-3xl" />
        <div className="absolute -right-55 top-20 h-140 w-140 rounded-full bg-emerald-200/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-10">

        {/* header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-neutral-200 bg-white shadow-sm">
              <span className="text-xs font-bold">D</span>
            </div>
            <div>
              <div className="text-sm font-semibold">DeFine</div>
              <div className="text-xs text-neutral-500">define.is</div>
            </div>
          </Link>

          <a
            href="#early-access"
            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50"
          >
            Join waitlist
          </a>
        </div>

        {/* HERO */}
        <section className="mt-5">
          <div className="mt-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              DeFi is fine -{" "}
              <span className="bg-linear-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                stay ahead.
              </span>
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              DeFine monitors wallet exposure across DeFi and turns it into a small set of
              risk signals you can act on - providing better insight,
              clearer decisions, and greater confidence in DeFi.
            </p>

            <p className="mt-3 text-sm text-neutral-600">
              Security warnings, clear reasoning, and configurable alerts.
            </p>

            <div className="mt-8">
              <a
                href="#early-access"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-6 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
              >
                Get early access
              </a>
            </div>
          </div>
        </section>

        {/* POSITIONING */}
        <section className="mt-10">
          <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
            Built for prevention, not just monitoring
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Early risk warnings"
              desc="Get notified before risk escalates across DeFi positions."
            />
            <Feature
              title="Custom alert thresholds"
              desc="Set your own limits for when alerts should fire — tuned to your risk tolerance."
            />
            <Feature
              title="Explainable alerts"
              desc="Clear reasoning behind each signal — no black-box scoring."
            />
            <Feature
              title="State-change monitoring"
              desc="Alerts only when something meaningful changes."
            />
            <Feature
              title="Reorg-aware logic"
              desc="Built with blockchain realities in mind."
            />
            <Feature
              title="Auditable risk modules"
              desc="Key detection components are open-source and verifiable."
            />
          </div>
        </section>

        {/* FINAL CTA WITH GRADIENT */}
        <section id="early-access" className="mt-14 scroll-mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">

            <div aria-hidden className="absolute inset-0">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/50 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
            </div>

            <div className="relative text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Get notified when early testing opens
              </h2>

              <div className="mt-5 max-w-xl mx-auto">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-neutral-200 pt-6 text-xs text-neutral-500 text-center">
          © {new Date().getFullYear()} DeFine • All rights reserved.
        </footer>
      </div>
    </main>
  );
}