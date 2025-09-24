import * as z from "zod";

export const educationSchema = z
  .object({
    institution: z.string().min(2, "Institution name is required"),
    degree: z.string().min(2, "Degree is required"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date().nullable().optional(),
    description: z.string().optional(),
    gpa: z.string().optional(),
    location: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
