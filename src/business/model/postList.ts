import Post from "./post"

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type PostList = {
  posts: Partial<Post>[]
  meta: {
    pagination: Pagination
  }
}

export default PostList