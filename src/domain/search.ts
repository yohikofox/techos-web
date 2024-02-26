import MicroPost from "./microPost";
import Post from "./post";

export type SearchItem = Post | MicroPost;

export type FacetedValue = {
  label: string;
  count: number;
};

export type FacetedSearch = {
  name: string;
  label: string;
  values: FacetedValue[];
  multiple?: boolean;
  autocomplete?: boolean;
  min?: number;
  max?: number;
  dataType?: string;
};

type Search = {
  hits: SearchItem[];
  facets?: FacetedSearch[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
};

export default Search;
