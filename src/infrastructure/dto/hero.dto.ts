import { z } from 'zod'
import { pictureDataSchema } from './picture.dto'

export const heroDataSchema = z.object({
  title: z.string(),
  picture: pictureDataSchema.optional().nullable(),
  background: pictureDataSchema.optional().nullable(),
  content: z.string().optional().nullable()
})

export type HeroData = z.infer<typeof heroDataSchema>