import * as z from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Project title is required."),
    description: z.string().min(1, "Project description is required."),
    thumbnail: z.any().optional(),
    images: z.any().optional(),
    liveUrl: z.string().url("Invalid Live URL").optional().or(z.literal("")),
    githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    technologies: z
        .array(z.object({ name: z.string(), icon: z.any() }))
        .min(1, "At least one technology is required."),
    features: z.array(z.string()).min(1, "At least one feature is required."),
});
