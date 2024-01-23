import { z } from "zod"
import { pictureDataSchema } from "./picture.dto"
import { tagDataSchema } from "./tag.dto"
import { metaDataSchema } from "./meta.dto"

const microPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  picture: pictureDataSchema.optional().nullable(),
  tags: z.object({
    data: z.array(tagDataSchema)
  })
})

export const microPostDataSchema = z.object({
  attributes: microPostSchema
})
export type MicroPostData = z.infer<typeof microPostDataSchema>


export const microPostListDataSchema = z.object({
  microPosts: z.object({
    data: z.array(microPostDataSchema),
    meta: metaDataSchema
  })
})

export const microPostDetailResponseSchema = z.object({
  microPosts: z.object({
    data: z.array(microPostDataSchema),
  })
})

export type MicroPostListData = z.infer<typeof microPostListDataSchema>
