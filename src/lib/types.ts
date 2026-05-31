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

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type Appointment = {
  id: string;
  patient_id: string | null;
  service_id: string | null;
  practitioner_id: string | null;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  payment_status: PaymentStatus;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_type: "new" | "returning";
  notes: string | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  appointment_id: string | null;
  patient_id: string | null;
  patient_name: string | null;
  patient_email: string | null;
  rating: number;
  comment: string | null;
  is_public: boolean;
  created_at: string;
};

export type UserRole = "customer" | "admin";

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  author: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Promotion = {
  id: string;
  title: string;
  description: string | null;
  discount_label: string | null;
  starts_on: string | null;
  ends_on: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
