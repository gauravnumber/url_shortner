import { z } from "zod";

export const formSchema = z.object({
  url: z.string().url().min(3, "Atleast 3 characters needed"),
  customSlug: z.string(),
});

export type TFormSchema = z.infer<typeof formSchema>;
