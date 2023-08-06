import Author from "./author"
import ImageSet from "./image"

export type SearchDataItem = {
  title: string
  content: string
  slug: string
  extract: string
  picture: ImageSet
  start_at: string
  author: Author
}

type SearchData = {
  hits: SearchDataItem[]
}


export default SearchData