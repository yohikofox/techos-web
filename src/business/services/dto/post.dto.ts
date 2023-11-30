import { z } from "zod"
import { authorDataSchema } from "./author.dto"
import { pictureDataSchema } from "./picture.dto"
import { tagDataSchema } from "./tag.dto"
import { postStatDataSchema } from "./post-stat.dto"
import { metaDataSchema } from "./meta.dto"

export const postDataSchema = z.object({
  attributes: z.object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
    extract: z.string(),
    start_at: z.string(),
    author: authorDataSchema,
    picture: pictureDataSchema,
    tags: z.object({
      data: z.array(tagDataSchema)
    }),
    post_stat_list: postStatDataSchema.optional().nullable()
  })
})
export type PostData = z.infer<typeof postDataSchema>


export const postListDataSchema = z.object({
  posts: z.object({
    data: z.array(postDataSchema),
    meta: metaDataSchema
  })
})

export type PostListData = z.infer<typeof postListDataSchema>
