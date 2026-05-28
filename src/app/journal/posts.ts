import type { ReactNode } from "react";

export type Pillar = {
  slug: "implants" | "pricing-guide" | "gum-disease";
  label: string;
  href: string;
};

export const PILLARS: Record<Pillar["slug"], Pillar> = {
  implants: {
    slug: "implants",
    label: "Specialist Implant Authority",
    href: "/implants",
  },
  "pricing-guide": {
    slug: "pricing-guide",
    label: "Transparent Pricing",
    href: "/pricing-guide",
  },
  "gum-disease": {
    slug: "gum-disease",
    label: "Gum Health & Periodontal Care",
    href: "/gum-disease",
  },
};

export type PostMeta = {
  slug: string;
  title: string;
  dek: string;
  description: string;
  keyword: string;
  pillar: Pillar;
  cross: Pillar;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  bodyId: BodyKey;
};

export type BodyKey =
  | "implant-cost-dharan"
  | "implant-procedure-steps"
  | "gum-disease-treatment-dharan"
  | "signs-of-gum-disease";

export const POSTS: PostMeta[] = [
  {
    slug: "implant-cost-dharan",
    bodyId: "implant-cost-dharan",
    title:
      "How Much Does a Dental Implant Cost in Dharan? Transparent Pricing Explained",
    dek: "What actually drives the price of a single dental implant — implant system, bone condition, restoration choice — and how Om Sai keeps the estimate honest.",
    description:
      "What drives the price of a dental implant in Dharan — implant system, bone condition, restoration. A consultant periodontist explains the estimate.",
    keyword: "dental implant cost Dharan",
    pillar: PILLARS["pricing-guide"],
    cross: PILLARS.implants,
    date: "2026-06-02",
    readMinutes: 8,
  },
  {
    slug: "implant-procedure-steps",
    bodyId: "implant-procedure-steps",
    title:
      "Step-by-Step Guide to the Dental Implant Procedure — What to Expect",
    dek: "From the first assessment to the final crown — a clear, stage-by-stage walk through the implant journey with a consultant periodontist in Dharan.",
    description:
      "A consultant periodontist walks through every stage of the dental implant procedure — assessment, surgery, healing, abutment, crown, and aftercare.",
    keyword: "dental implant Dharan",
    pillar: PILLARS.implants,
    cross: PILLARS["pricing-guide"],
    date: "2026-06-09",
    readMinutes: 11,
  },
  {
    slug: "gum-disease-treatment-dharan",
    bodyId: "gum-disease-treatment-dharan",
    title:
      "Gum Disease Treatment in Dharan — Causes, Symptoms, and Care Options",
    dek: "Why gums bleed, what gingivitis and periodontitis really mean, and the staged care options available locally with a consultant periodontist.",
    description:
      "A consultant periodontist in Dharan explains gum disease causes, warning signs, and the staged treatment options — from cleaning to surgical care.",
    keyword: "gum disease treatment Dharan",
    pillar: PILLARS["gum-disease"],
    cross: PILLARS.implants,
    date: "2026-06-16",
    readMinutes: 8,
  },
  {
    slug: "signs-of-gum-disease",
    bodyId: "signs-of-gum-disease",
    title: "Signs of Gum Disease You Should Never Ignore",
    dek: "Bleeding gums, bad breath, recession, loose teeth — the eight early-warning signals a periodontist wants you to act on.",
    description:
      "Eight early signs of gum disease a consultant periodontist wants you to act on — bleeding, recession, mobility, bad breath and more.",
    keyword: "signs of gum disease",
    pillar: PILLARS["gum-disease"],
    cross: PILLARS["pricing-guide"],
    date: "2026-06-23",
    readMinutes: 6,
  },
];

export const POSTS_BY_SLUG: Record<string, PostMeta> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export const AUTHOR = {
  name: "Dr. Ajit Yadav, MDS",
  role: "Consultant Periodontist & Implantologist",
};

export const LAST_REVIEWED = "2026-05-28";

// Body content lives in JSX files to keep this module type-safe.
// Each body file default-exports a ReactNode under BodyKey.
export type BodyComponent = () => ReactNode;
