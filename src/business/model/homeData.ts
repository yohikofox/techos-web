import ImageSet from "./image"

type HomeData = {
  hero?: {
    title: string
    content: string
    background: ImageSet
    picture: ImageSet
  },
  search?: {
    placeholder: string
  }
}

export default HomeData