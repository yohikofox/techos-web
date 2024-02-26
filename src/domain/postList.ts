import Meta from "./meta";
import Post from "./post";
import { FacetedSearch } from "./search";

type PostList = {
  posts: Post[];
  meta: Meta;
  facets?: FacetedSearch[];
};

export default PostList;
