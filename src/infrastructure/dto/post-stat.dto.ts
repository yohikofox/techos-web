import { z } from "zod";

export const postStatDataSchema = z.object({
  id: z.coerce.number(),
  view_count: z.number(),
});

export const postStatDataResponseSchema = z.object({
  postStatLists: z.object({
    items: z.array(postStatDataSchema),
  }),
});

export const updatePostStatsResponseSchema = z.object({
  updatePostStatList: postStatDataSchema,
});

export const createPostStatResponseSchema = z.object({
  createPostStatList: postStatDataSchema,
});

const optionalPostStatDataSchema = postStatDataSchema.strict().optional();

export type PostStatData = z.infer<typeof optionalPostStatDataSchema>;

export type PostStatDataResponse = z.infer<typeof postStatDataResponseSchema>;

export type UpdatePostStatsResponse = z.infer<
  typeof updatePostStatsResponseSchema
>;

export type CreatePostStatResponse = z.infer<
  typeof createPostStatResponseSchema
>;
