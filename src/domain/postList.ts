import { Pagination } from "./pagination"
import Post from "./post"

type PostList = {
  posts: Partial<Post>[]
  meta: {
    pagination: Pagination
  }
}

export default PostList