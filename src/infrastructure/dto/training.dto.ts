import { z } from "zod"
import { pictureDataSchema } from "./picture.dto";

export const trainingSchema = z.object({
  title: z.string(),
  link: z.string(),
  background: pictureDataSchema
})

export const trainingDataSchema = z.object({
  attributes: trainingSchema
});

export type TrainingData = z.infer<typeof trainingSchema>