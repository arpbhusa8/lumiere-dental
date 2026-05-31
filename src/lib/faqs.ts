export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  is_active: boolean;
};

// Fallback FAQs — used if the `faqs` table is empty or unavailable (e.g. before
// migration 010 is applied). Mirrors the seed rows in 010_content_management.sql.
export const FALLBACK_FAQS: Faq[] = [
  {
    id: "f1",
    question: "Where is the clinic located?",
    answer:
      "Om Sai Dental Implant Center is in Dharan-2, Desi Line, Sunsari district, Nepal.",
    category: "Visiting",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "f2",
    question: "How do I book an appointment?",
    answer:
      "Use the Book a consultation button on any page, call 025-538312, or message us on WhatsApp.",
    category: "Booking",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "f3",
    question: "Who is the lead dentist?",
    answer:
      "Dr. Ajit Yadav, MDS — Consultant Periodontist & Implantologist, and a lecturer at Nobel Medical College.",
    category: "About",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "f4",
    question: "Do you place dental implants?",
    answer:
      "Yes. Implants and periodontal (gum) care are our core focus. Book a consultation to discuss your case.",
    category: "Treatments",
    sort_order: 4,
    is_active: true,
  },
];
