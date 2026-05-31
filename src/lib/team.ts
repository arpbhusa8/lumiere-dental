// Canonical Om Sai team roster — single source of truth for /team, home grid, /about.
//
// Facts here are sanctioned by the client (sourced from the #om-sai-dental Slack channel)
// or are public record. Do NOT invent credentials, specialties, years of experience, or
// LinkedIn URLs. `linkedin: null` is a tracked proof gap, not a placeholder to be filled
// with a guess — leave null until a confirmed profile URL is provided.
//
// Photos: drop the file named in `photoFile` into `public/team/`. The server resolver
// (`resolveTeam` in this module) auto-detects it and the UI swaps the initials avatar for
// the real photo — no code change needed once the image lands.

import { existsSync } from "node:fs";
import { join } from "node:path";

export type TeamRole = "clinician" | "support";

export type Publication = {
  title: string;
  authors: string;
  /** Journal / year citation, or null when not yet confirmed. */
  source: string | null;
};

export type TeamMember = {
  slug: string;
  name: string;
  /** Short credential line, e.g. "BDS · Dental Surgeon". */
  credentials: string;
  role: TeamRole;
  /** Role title shown as the eyebrow above the name. */
  title: string;
  /** Nepal Medical Council registration number, when applicable. */
  nmcNo: string | null;
  bio: string;
  /** Expected filename under public/team/. */
  photoFile: string;
  /** Confirmed LinkedIn profile URL, or null (proof gap — never fabricate). */
  linkedin: string | null;
  /** Whether this member can be selected when booking an appointment. */
  bookable: boolean;
  /** Cumulative implant placements, when the clinician has confirmed a figure. */
  implantsPlaced?: number;
  /** Surgical / clinical areas of expertise. */
  expertise?: string[];
  /** Peer-reviewed publications authored by this clinician. */
  publications?: Publication[];
};

export type ResolvedTeamMember = TeamMember & {
  /** Public path to the photo if the file exists, otherwise null (initials fallback). */
  photoUrl: string | null;
};

export const TEAM: TeamMember[] = [
  {
    slug: "dr-ajit-yadav",
    name: "Dr. Ajit Yadav",
    credentials:
      "MDS · Consultant Periodontist & Implantologist · Lecturer, Nobel Medical College",
    role: "clinician",
    title: "Lead Clinician — Periodontist & Implantologist",
    nmcNo: null,
    bio: "Dr. Ajit Yadav holds a Master of Dental Surgery in Periodontology and practises as a consultant periodontist and implantologist. Alongside chair-side care at Om Sai, he lectures at Nobel Medical College in Biratnagar — a teaching role that keeps his clinical protocols anchored in current evidence. His approach is patient-first and explanation-led: each consultation focuses on understanding the underlying condition, walking through the realistic options and agreeing a plan before treatment begins.",
    photoFile: "dr-ajit-yadav.webp",
    linkedin: null, // proof-gap: confirmed LinkedIn URL not yet provided
    bookable: true,
    implantsPlaced: 100,
    expertise: [
      "Gingival surgery",
      "Surgical extraction",
      "Aesthetic restoration & surgery",
    ],
    publications: [
      {
        title:
          "Clinical perspective of myths about oral health in patients visiting tertiary hospital in eastern Nepal: A descriptive cross-sectional study",
        authors: "Yadav AK, Giri DK, Subedi K",
        source: "J Kathmandu Med Coll. 2021;10(3):152–156",
      },
      {
        title:
          "Coronavirus Disease 2019 Awareness among Dental Undergraduate Students in a Teaching Hospital of Eastern Nepal",
        authors: "Yadav AK, Giri DK, Subedi K",
        source: "J Nepal Dent Assoc. 2022;22(35):76–83",
      },
      {
        title: "Gingival Depigmentation: A Surgery for Aesthetics",
        authors: "Yadav AK, Giri DK",
        source: "J Nepal Soc Perio Oral Implantol. 2019;3(1):29–31",
      },
    ],
  },
  {
    slug: "dr-priyesh-kamat",
    name: "Dr. Priyesh Kamat",
    credentials: "BDS (BPKIHS) · Dental Surgeon · NMC No. 43429",
    role: "clinician",
    title: "Dental Surgeon",
    nmcNo: "43429",
    bio: "Dr. Priyesh Kamat is a dental surgeon at Om Sai Dental Implant Center. He holds a Bachelor of Dental Surgery (BDS) from the B.P. Koirala Institute of Health Sciences (BPKIHS) in Dharan and is registered with the Nepal Medical Council (NMC No. 43429).",
    photoFile: "dr-priyesh-kamat.webp",
    linkedin: null, // proof-gap: no confirmed LinkedIn profile found in research
    bookable: true,
  },
  {
    slug: "renuka-rai",
    name: "Renuka Rai",
    credentials: "B.Ed · Office Assistant",
    role: "support",
    title: "Office Assistant",
    nmcNo: null,
    bio: "Renuka Rai holds a Bachelor of Education (B.Ed) and is the office assistant at Om Sai Dental Implant Center. She looks after front-desk coordination and helps patients with appointments and enquiries.",
    photoFile: "renuka-rai.webp",
    linkedin: null, // proof-gap: confirmed LinkedIn URL not yet provided
    bookable: false,
  },
];

/**
 * Server-only. Resolves each member's photo path against public/team/, returning
 * photoUrl when the file exists and null otherwise. Call from server components.
 */
export function resolveTeam(members: TeamMember[] = TEAM): ResolvedTeamMember[] {
  const dir = join(process.cwd(), "public", "team");
  return members.map((m) => ({
    ...m,
    photoUrl: existsSync(join(dir, m.photoFile)) ? `/team/${m.photoFile}` : null,
  }));
}

export const clinicians = (team: ResolvedTeamMember[]) =>
  team.filter((m) => m.role === "clinician");
export const supportStaff = (team: ResolvedTeamMember[]) =>
  team.filter((m) => m.role === "support");

/** Initials for the avatar fallback, e.g. "Dr. Priyesh Kamat" → "PK". */
export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
