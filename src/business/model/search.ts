import MicroPost from "./microPost"
import Post from "./post"

export type SearchItem = Post | MicroPost


type Search = {
  hits: SearchItem[]
}


export default Search