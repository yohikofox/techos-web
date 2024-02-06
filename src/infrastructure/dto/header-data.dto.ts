import { trainingSchema } from "@dto/training.dto";
import { z } from "zod";

export const headerSchema = z.object({
  placeholder: z.string(),
  search_title: z.string(),
});

export const headerDataSchema = z.object({
  header: headerSchema,
  trainings: z
    .object({
      items: z.array(trainingSchema),
    })
    .optional(),
});

export type HeaderResponseData = z.infer<typeof headerDataSchema>;
export type HeaderData = z.infer<typeof headerSchema>;
