import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/home/hero";
import { PressStrip } from "@/components/home/press-strip";
import { Philosophy } from "@/components/home/philosophy";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { TeamGrid } from "@/components/home/team-grid";
import { TestimonialFeature } from "@/components/home/testimonial-feature";
import { CtaBlock } from "@/components/home/cta-block";
import type { Service, Practitioner, Testimonial } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: services }, { data: practitioners }, { data: testimonials }] =
    await Promise.all([
      supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
      supabase.from("practitioners").select("*").eq("is_active", true).order("sort_order"),
      supabase.from("testimonials").select("*").eq("is_featured", true).limit(3),
    ]);

  return (
    <>
      <Hero />
      <PressStrip />
      <Philosophy />
      <ServicesTeaser services={(services ?? []) as Service[]} />
      <TeamGrid practitioners={(practitioners ?? []) as Practitioner[]} />
      <TestimonialFeature testimonials={(testimonials ?? []) as Testimonial[]} />
      <CtaBlock />
    </>
  );
}
