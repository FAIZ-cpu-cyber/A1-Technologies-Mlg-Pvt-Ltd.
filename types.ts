export enum UserRole {
  ADMIN = 'admin',
  TECHNICIAN = 'technician',
  CUSTOMER = 'customer',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => User | null;
  logout: () => void;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  specifications: string[];
  price: number;
  description: string;
}

export enum ServiceStatus {
    UNSOLVED = 'Unsolved',
    IN_PROCESS = 'In Process',
    SOLVED = 'Solved',
}

export interface CustomerFeedback {
    rating: number; // 1 to 5
    remarks: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  productName: string;
  issueDescription: string;
  status: ServiceStatus;
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  technicianNotes?: string;
  completionReportUrl?: string;
  feedback?: CustomerFeedback;
  createdAt: string;
  address: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  company?: string;
  text: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WebsiteContent {
  hero: {
    title: string;
    subtitle: string;
  };
  stats: Stat[];
  about: {
    title: string;
    content: string;
  };
  features: Feature[];
  testimonials: Testimonial[];
}