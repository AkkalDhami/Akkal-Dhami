import * as z from "zod";

export const skillSchema = z.object({
  name: z.string().min(2, "Skill name is required"),
  description: z.string().min(5, "Short description is required"),
  icon: z
    .object({
      component: z.string().optional(),
      color: z.string().optional(),
    })
    .min(1, "Icon is required"),
  category: z.string().min(2, "Category is required"),
});
// const skillSchema = z.object({
//   name: z.string().min(1, "Skill name is required"),
//   description: z.string().min(1, "Description is required"),
//   category: z.string().min(1, "Category is required"),
//   icon: z.any().refine((val) => val, { message: "Icon is required" }),
// });
