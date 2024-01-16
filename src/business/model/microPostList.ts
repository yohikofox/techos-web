import MicroPost from "./microPost"
import { Pagination } from "./pagination"

type MicroPostList = {
  posts: Partial<MicroPost>[]
  meta: {
    pagination: Pagination
  }
}

export default MicroPostList