import * as z from "zod";

export const experienceSchema = z
  .object({
    company: z.string().min(2, "Company name is required"),
    position: z.string().min(2, "Position is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date().nullable().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    location: z.string().optional(),
    achievements: z.array(z.string()).optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
