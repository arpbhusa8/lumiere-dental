"use client";

import { useState } from "react";
import { whatsappLink, ENQUIRY_PREFILL } from "@/lib/whatsapp";
import type { Faq } from "@/lib/faqs";

/**
 * Floating enquiry chatbot: a guided FAQ widget (pick a question → canned
 * answer, no AI) with a "Chat on WhatsApp" handoff for anything else.
 * FAQs are admin-managed (passed in from the server, DB-backed with a fallback).
 */
export function EnquiryChatbot({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Faq | null>(null);

  const wa = whatsappLink(ENQUIRY_PREFILL + " ");

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(92vw,22rem)] rounded-2xl border border-border bg-card shadow-xl shadow-black/15 overflow-hidden">
          {/* header */}
          <div className="bg-[var(--forest)] text-[var(--ivory)] px-5 py-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--ivory)]/70">
              Om Sai Dental
            </div>
            <div className="font-serif text-lg leading-tight">How can we help?</div>
          </div>

          {/* body */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {active ? (
              <div>
                <button
                  onClick={() => setActive(null)}
                  className="text-xs text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1"
                >
                  ← All questions
                </button>
                <p className="font-serif text-base text-foreground mb-2">{active.question}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{active.answer}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-1">Pick a question:</p>
                {faqs.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActive(f)}
                    className="w-full text-left text-sm rounded-lg border border-border px-3 py-2.5 hover:border-[var(--brass)] hover:bg-[var(--bone)]/40 transition-colors"
                  >
                    {f.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* footer — direct WhatsApp */}
          <div className="border-t border-border p-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white text-sm font-medium py-2.5 hover:brightness-95 transition"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close enquiry chat" : "Open enquiry chat"}
        aria-expanded={open}
        className="size-14 rounded-full bg-[var(--forest)] text-[var(--ivory)] shadow-lg shadow-black/25 grid place-items-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)]"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
