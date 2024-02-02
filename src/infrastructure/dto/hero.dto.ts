import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";

export const heroDataSchema = z.object({
  title: z.string(),
  picture: pictureDataSchema.optional().nullable(),
  background: pictureDataSchema.optional(),
  content: z.string().optional().nullable(),
});

export type HeroData = z.infer<typeof heroDataSchema>;
