import { z } from "zod";

export const offLineSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const offLineDataSchema = offLineSchema;

export const offLineDataResponseSchema = z.object({
  offlinePage: offLineDataSchema,
});

export type OffLineData = z.infer<typeof offLineDataSchema>;

export type OffLineDataResponse = z.infer<typeof offLineDataResponseSchema>;
