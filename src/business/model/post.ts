import Author from "./author"
import ImageSet from "./image"
import Tag from "./tag"

export enum PostType {
  Article = "article",
  Event = "event",
  News = "news",
  Project = "project",
  Ad = "ad",
}

type Post = {
  title: string
  extract: string
  slug: string
  content: string
  start_at: string
  end_at?: string
  picture?: Partial<ImageSet>
  author: Author
  type: PostType,
  tags?: Tag[]
}

export default Post