export enum Role {
  USER = "USER",
  DERMATOLOGISTS = "DERMATOLOGISTS",
  ADMIN = "ADMIN",
}

export type SkinConcern =
  | "ACNE"
  | "AGING"
  | "PIGMENTATION"
  | "SENSITIVITY"
  | "DRYNESS"
  | "OILINESS"
  | "REDNESS"
  | "UNEVEN_TEXTURE";

export type SkinType = "DRY" | "OILY" | "COMBINATION" | "NORMAL" | "SENSITIVE";

export interface SkinTypeObject {
  type: SkinType;
}

export interface SkinConcernObject {
  concern: SkinConcern;
}

export interface SkinProfileData {
  id?: string;
  userId?: string;
  SkinType: SkinTypeObject[];
  Concerns: SkinConcernObject[];
  allergies?: string;
  goals?: string;
  lastAssessment?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProgressLogFormValues {
  image?: File;
  notes?: string;
  concerns: string;
  rating: number;
}

export interface ProgressLogResponse {
  success: boolean;
  message?: string;
  log?: ProgressLogData;
}

export enum NotificationType {
  APPOINTMENT = "APPOINTMENT",
  CHAT = "CHAT",
  SYSTEM = "SYSTEM",
}

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

// User related types
export interface UserData {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  image?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: UserData;
  token: string;
}

// Admin related types
export interface AdminStats {
  totalUsers: number;
  totalDermatologists: number;
  totalProducts: number;
  totalAppointments: number;
}

// Chat related types
export interface ChatData {
  id: string;
  userId: string;
  dermatologistId: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
  dermatologist: {
    id: string;
    name: string;
    image?: string;
  };
  messages: MessageData[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageData {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
}

// Notification related types
export interface NotificationData {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// AI related types
export interface AIRecommendation {
  aiRecommendations: string;
  matchingProducts: ProductData[];
}

export interface SkinAssessmentFormData {
  allergies?: string;
  goals?: string;
  skinType: { type: SkinType }[];
  concerns: { concern: SkinConcern }[];
}

// Product related types
export interface ProductData {
  targetConcerns: any;
  suitableSkinTypes: any;
  id: string;
  name: string;
  brand: string;
  description: string;
  ingredients: string;
  sustainabilityScore: number;
  allergens?: string | null;
  imageUrl?: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Routine related types
export interface RoutineData {
  id: string;
  userId: string;
  name: string;
  type: string;
  steps: RoutineStepData[];
}

export interface RoutineStepData {
  id: string;
  routineId: string;
  productId: string;
  product: ProductData;
  stepOrder: number;
  notes?: string;
}

// Progress related types
export interface ProgressLogData {
  id: string;
  userId: string;
  imageUrl?: string;
  notes?: string;
  concerns: SkinConcern;
  rating: number;
  createdAt: Date;
}

export interface ProgressComparisonData {
  before: ProgressLogData;
  after: ProgressLogData;
  improvementPercentage: number;
}

// Appointment related types
export interface AppointmentData {
  id: string;
  userId: string;
  dermatologistId: string;
  date: Date;
  status: AppointmentStatus;
  notes?: string;
  user: UserData;
  dermatologist: UserData;
}

// Dermatologist related types
export interface DermatologistStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  pendingAssessments: number;
  totalRoutines: number;
}

export interface DermatologistActivity {
  type: "routine_created" | "assessment_completed" | "progress_update";
  date: Date;
  patient: string;
  details: string;
}

export interface Patient extends UserData {
  skinProfile: SkinProfileData;
  progressLogs: ProgressLogData[];
  routines?: RoutineData[];
}
