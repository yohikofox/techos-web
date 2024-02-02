import { z } from "zod";

import { pictureDataSchema } from "./picture.dto";

export const authorDataSchema = z.object({
  username: z.string(),
  avatar: pictureDataSchema.optional(),
});

export type AuthorData = z.infer<typeof authorDataSchema>;
