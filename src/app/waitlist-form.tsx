"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const INTERESTS = [
  {
    id: "wallet-security",
    label: "Wallet security",
    description: "Risky approvals and suspicious activity",
  },
  {
    id: "defi-positions",
    label: "DeFi positions",
    description: "Lending, liquidity, staking, and yield risks",
  },
  {
    id: "wallet-exposure",
    label: "Wallet exposure",
    description: "High-risk counterparties, tainted funds",
  },
  {
    id: "protocol-risks",
    label: "Protocol & contract risks",
    description: "Vulnerabilities and protocol changes",
  },
] as const;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [showInterests, setShowInterests] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          interests,
          otherInterest: interests.includes("other") ? otherInterest.trim() : "",
        }),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll email you when early testing is ready.");
      setEmail("");
      setInterests([]);
      setOtherInterest("");
      setShowInterests(false);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  function toggleInterest(id: string) {
    setInterests((current) =>
      current.includes(id)
        ? current.filter((interest) => interest !== id)
        : [...current, id]
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-left">
        <button
          type="button"
          aria-expanded={showInterests}
          aria-controls="waitlist-interests"
          onClick={() => setShowInterests((shown) => !shown)}
          className="inline-flex cursor-pointer items-center text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-950 hover:decoration-neutral-500"
        >
          Select the areas that matter most to you
          <span className="font-normal text-neutral-500">&nbsp;(optional)</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className={`h-4 w-4 ml-2 transition-transform ${showInterests ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {showInterests ? (
          <fieldset id="waitlist-interests" className="mt-3">
            <legend className="sr-only">Areas you would like DeFine to monitor</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {INTERESTS.map((interest) => (
                <label
                  key={interest.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 bg-white/70 px-3 py-3 text-left transition hover:border-neutral-300 hover:bg-white"
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(interest.id)}
                    onChange={() => toggleInterest(interest.id)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                  />
                  <span>
                    <span className="block text-sm font-medium text-neutral-900">{interest.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">
                      {interest.description}
                    </span>
                  </span>
                </label>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/70 px-3 py-3 text-left sm:col-span-2">
                <label className="flex shrink-0 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={interests.includes("other")}
                    onChange={() => toggleInterest("other")}
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                  />
                  <span className="text-sm font-medium text-neutral-900">Other</span>
                </label>
                <label htmlFor="other-interest" className="sr-only">
                  Other area to monitor
                </label>
                <input
                  id="other-interest"
                  value={otherInterest}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOtherInterest(value);

                    if (value.trim() && !interests.includes("other")) {
                      setInterests((current) => [...current, "other"]);
                    }
                  }}
                  maxLength={160}
                  placeholder="What else should DeFine monitor?"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200/60"
                />
              </div>
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@domain.com"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200/60"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || status === "loading"}
          className="h-11 rounded-xl bg-neutral-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Saving…" : "Notify me"}
        </button>
      </div>

      {message ? (
        <p
          aria-live="polite"
          className={[
            "text-sm",
            status === "success" ? "text-emerald-700" : "text-rose-700",
          ].join(" ")}
        >
          {message}
        </p>
      ) : (
        <p className="text-xs text-neutral-500">
          We&apos;ll email you when it&apos;s ready.
        </p>
      )}
    </form>
  );
}
