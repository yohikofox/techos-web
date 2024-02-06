import Meta from "./meta"
import MicroPost from "./microPost"

type MicroPostList = {
  posts: Partial<MicroPost>[]
  meta: Meta
}

export default MicroPostList