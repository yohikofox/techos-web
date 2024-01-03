import { ZodTypeAny } from "zod"

export type FetchOptions = {
  revalidate?: number
  tags?: string[],
  schema?: ZodTypeAny
}