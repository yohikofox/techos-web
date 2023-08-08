import Hero from "./hero"
import ImageSet from "./image"

type HomeData = {
  hero?: Hero,
  search?: {
    placeholder: string
  }
}

export default HomeData