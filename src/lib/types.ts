export type ServiceCategory =
  | "general"
  | "cosmetic"
  | "restorative"
  | "orthodontics"
  | "implants"
  | "whitening"
  | "specialist";

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  duration_minutes: number;
  price_from: number | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export type Practitioner = {
  id: string;
  slug: string;
  name: string;
  credentials: string;
  bio: string | null;
  photo_url: string | null;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  patient_first_name: string;
  treatment: string | null;
  quote: string;
  rating: number;
  is_featured: boolean;
};

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type Appointment = {
  id: string;
  patient_id: string | null;
  service_id: string | null;
  practitioner_id: string | null;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_type: "new" | "returning";
  notes: string | null;
  created_at: string;
};
