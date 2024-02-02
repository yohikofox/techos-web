import { IndexNames } from "@interfaces/ISearchRepository";
import { ZodTypeAny } from "zod";

export type SearchRequest = {
  indexName: IndexNames;
  filter?: Record<string, string | string[]>;
  payload?: string;
  schema?: ZodTypeAny;
};
