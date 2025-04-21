import { z } from "zod";

export type loginFormData = z.infer<typeof loginFormSchema>;
export type registerFormData = z.infer<typeof registerFormSchema>;
export type ProgressLogFormValues = z.infer<typeof progressLogSchema>;
export type RoutineFormValues = z.infer<typeof routineFormSchema>;

export const loginFormSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const registerFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email formate"),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Must be 3 or more characters long")
    .max(20, "Must be less than 20 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Must contain one capital letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Must contain one small letter"
    )
    .refine((password) => /[0-9]/.test(password), "Must contain one number")
    .refine(
      (password) => /[!@#$%^&*]/.test(password),
      "Must contain one special character"
    ),
  name: z.string().min(3, "Name is required"),
  role: z.enum(["USER", "DERMATOLOGISTS"], {
    errorMap: () => ({ message: "you must select a role" }),
  }),
  phone: z.string().min(3, "Phone Number is required."),
});

// Form schema
export const progressLogSchema = z.object({
  imageUrl: z.string().optional(),
  notes: z
    .string()
    .max(500, {
      message: "Notes should not exceed 500 characters",
    })
    .optional(),
  concerns: z.string({
    required_error: "Please select a primary concern",
  }),
  rating: z
    .number({
      required_error: "Please rate your skin condition",
    })
    .min(1)
    .max(5),
});


export const routineFormSchema = z.object({
  name: z.string().min(3, {
    message: "Routine name must be at least 3 characters",
  }),
  type: z.string({
    required_error: "Please select a routine type",
  }),
});