export enum Role {
  USER = "USER",
  DERMATOLOGISTS = "DERMATOLOGISTS",
  ADMIN = "ADMIN",
}

export enum SkinConcern {
  ACNE = "ACNE",
  AGING = "AGING",
  PIGMENTATION = "PIGMENTATION",
  SENSITIVITY = "SENSITIVITY",
  DRYNESS = "DRYNESS",
  OILINESS = "OILINESS",
  REDNESS = "REDNESS",
  UNEVEN_TEXTURE = "UNEVEN_TEXTURE",
}

export enum SkinType {
  DRY = "DRY",
  OILY = "OILY",
  COMBINATION = "COMBINATION",
  NORMAL = "NORMAL",
  SENSITIVE = "SENSITIVE",
}

// User related types
export interface UserData {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  image?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: UserData;
  token: string;
}

// Skin profile related types
export interface SkinProfileData {
  id: string;
  userId: string;
  skinType: SkinType;
  concerns: SkinConcern[];
  allergies?: string;
  goals?: string;
  lastAssessment: Date;
}

export interface SkinAssessmentFormData {
  skinType: SkinType;
  concerns: SkinConcern[];
  allergies?: string;
  goals?: string;
}

// Product related types
export interface ProductData {
  id: string;
  name: string;
  brand: string;
  description: string;
  ingredients: string;
  sustainabilityScore: number;
  allergens?: string;
  imageUrl?: string;
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
