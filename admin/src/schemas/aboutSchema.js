import z from "zod";

export const aboutSchema = z.object({
  name: z.string().trim().min(3, "Name is required."),
  email: z.string().email("Invalid email."),
  shortIntro: z.string().trim().optional(),
  contact: z
    .string()
    .min(1, "Contact is required.")
    .min(10, "Invalid contact number.")
    .max(10, "Invalid contact number.")
    .regex(/^\d+$/, "Contact must be a number."),
  location: z.string().trim().min(3, "Location is required."),
  roles: z.array(z.string().trim()).min(1, "At least one role is required."),
});
