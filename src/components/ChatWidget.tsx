"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Msg {
  from: "bot" | "user";
  text: string;
}

type Topic = "hours" | "location" | "phone" | "brands" | "book";

export interface ChatConfig {
  title: string;
  status: string;
  greeting: string;
  placeholder: string;
  hint: string;
  whatsapp: string;
  q: Record<Topic, string>;
  a: { brands: string; book: string; fallback: string };
  // resolved contact facts
  hoursText: string;
  address: string;
  branch2: string;
  phone: string;
  waNumber: string;
}

const GlassesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2">
    <circle cx="11" cy="14" r="7" />
    <circle cx="37" cy="14" r="7" />
    <path d="M18 12c2-2 10-2 12 0" strokeLinecap="round" />
    <path d="M4 12 1.5 8M44 12l2.5-4" strokeLinecap="round" />
  </svg>
);

export function ChatWidget({ config, locale }: { config: ChatConfig; locale: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: config.greeting }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function answerFor(topic: Topic): string {
    switch (topic) {
      case "hours":
        return config.hoursText;
      case "location":
        return `📍 ${config.address}\n📍 ${config.branch2}`;
      case "phone":
        return `📞 ${config.phone}`;
      case "brands":
        return config.a.brands;
      case "book":
        return config.a.book;
    }
  }

  function ask(topic: Topic) {
    setMessages((m) => [...m, { from: "user", text: config.q[topic] }, { from: "bot", text: answerFor(topic) }]);
  }

  function classify(text: string): Topic | null {
    const t = text.toLowerCase();
    const has = (...w: string[]) => w.some((x) => t.includes(x));
    if (has("دوام", "وقت", "ساعة", "متى", "hour", "time", "open")) return "hours";
    if (has("موقع", "عنوان", "فرع", "وين", "اين", "location", "address", "where", "branch")) return "location";
    if (has("هاتف", "رقم", "اتصال", "تلفون", "phone", "call", "number", "contact")) return "phone";
    if (has("ماركة", "ماركات", "براند", "brand", "optiswiss", "acuvue", "bella", "swarovski")) return "brands";
    if (has("حجز", "موعد", "فحص", "book", "appointment", "exam", "test")) return "book";
    return null;
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const topic = classify(text);
    setMessages((m) => [
      ...m,
      { from: "user", text },
      { from: "bot", text: topic ? answerFor(topic) : config.a.fallback },
    ]);
  }

  const waHref = `https://wa.me/${config.waNumber}`;
  const topics = Object.keys(config.q) as Topic[];

  return (
    <div className="fixed bottom-5 z-[90] ltr:right-5 rtl:left-5" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Panel */}
      {open ? (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm origin-bottom animate-pop-in overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-2xl ltr:origin-bottom-right rtl:origin-bottom-left">
          {/* Header */}
          <div className="flex items-center gap-3 bg-night px-4 py-3 text-white">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-night">
              <GlassesIcon className="h-5 w-8" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-bold">{config.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-teal" />
                {config.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="max-h-72 space-y-3 overflow-y-auto bg-cream/60 p-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                    m.from === "user"
                      ? "bg-gold text-night ltr:rounded-br-sm rtl:rounded-bl-sm"
                      : "bg-surface text-ink ltr:rounded-bl-sm rtl:rounded-br-sm",
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="border-t border-ink/10 bg-surface p-3">
            <p className="mb-2 text-xs text-ink-muted">{config.hint}</p>
            <div className="flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => ask(t)}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold-dark transition-colors hover:bg-gold hover:text-night"
                >
                  {config.q[t]}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="mt-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={config.placeholder}
                className="flex-1 rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm text-ink outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={send}
                aria-label={config.placeholder}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-night text-white transition-colors hover:bg-gold hover:text-night"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12h15m0 0-6-6m6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z"/></svg>
              {config.whatsapp}
            </a>
          </div>
        </div>
      ) : null}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={config.title}
        className="group relative ms-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-night shadow-2xl transition-transform hover:scale-105"
      >
        {!open ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
        ) : null}
        {open ? (
          <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <GlassesIcon className="relative h-6 w-11" />
        )}
      </button>
    </div>
  );
}
