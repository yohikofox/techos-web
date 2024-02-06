import { SearchRequest } from "../getSearchData";

export type PostListRequest = {
  index?: number;
  limit?: number;
  sort?: string;
} & SearchRequest;
