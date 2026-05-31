// Single source of truth for the clinic's WhatsApp enquiry line.
// Number is the same one used across the marketing pages (Dr. Ajit's line).
export const WHATSAPP_NUMBER = "9779852057909";

/**
 * Builds a wa.me deep link, optionally with a pre-filled message so the
 * customer lands in a chat ready to send their enquiry.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const ENQUIRY_PREFILL =
  "Hello Om Sai Dental, I'd like to make an enquiry about";
