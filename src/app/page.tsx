import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/home/hero";
import { PressStrip } from "@/components/home/press-strip";
import { Philosophy } from "@/components/home/philosophy";
import { ServicesTeaser } from "@/components/home/services-teaser";
import { TeamGrid } from "@/components/home/team-grid";
import { TestimonialFeature } from "@/components/home/testimonial-feature";
import { Location } from "@/components/home/location";
import { CtaBlock } from "@/components/home/cta-block";
import type { Service, Testimonial } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: services }, { data: testimonials }] = await Promise.all([
    supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("testimonials").select("*").eq("is_featured", true).limit(3),
  ]);

  return (
    <>
      <Hero />
      <PressStrip />
      <Philosophy />
      <ServicesTeaser services={(services ?? []) as Service[]} />
      <TeamGrid />
      <TestimonialFeature testimonials={(testimonials ?? []) as Testimonial[]} />
      <Location />
      <CtaBlock />
    </>
  );
}
