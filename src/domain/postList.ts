import Meta from "./meta"
// import { Pagination } from "./pagination"
import Post from "./post"

type PostList = {
  posts: Partial<Post>[]
  meta: Meta
}

export default PostList