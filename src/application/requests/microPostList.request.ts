import { SearchRequest } from "../getSearchData";

export type MicroPostListRequest = {
  index?: number;
  limit?: number;
  sort?: string;
} & SearchRequest;
