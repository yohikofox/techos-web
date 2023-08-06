import Author from "./author"
import ImageSet from "./image"

type Post = {
  title: string
  extract: string
  slug: string
  content: string
  start_at: string
  end_at?: string
  picture?: Partial<ImageSet>
  author: Author
}

export default Post