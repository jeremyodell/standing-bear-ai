export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export interface Value {
  id: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  anchorX?: number;
  anchorY?: number;
}

export interface AnchorPoint {
  x: number;
  y: number;
}
