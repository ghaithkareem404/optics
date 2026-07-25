"use client";

import { useState } from "react";

interface FormLabels {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  note: string;
  success: string;
}

export function ContactForm({ labels }: { labels: FormLabels }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Demo only: no network call. Wire this to an API route, email service,
    // or booking system when ready (e.g. a POST to /api/contact).
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-gold";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={field} name="name" placeholder={labels.name} required />
        <input className={field} type="email" name="email" placeholder={labels.email} required />
      </div>
      <input className={field} name="phone" placeholder={labels.phone} dir="ltr" />
      <textarea className={field} name="message" placeholder={labels.message} rows={5} required />
      <button
        type="submit"
        className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-white"
      >
        {labels.submit}
      </button>
      {sent ? <p className="text-sm font-medium text-green-700">{labels.success}</p> : null}
      <p className="text-xs text-ink-muted">{labels.note}</p>
    </form>
  );
}
