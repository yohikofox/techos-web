import ImageSet from "./image"

type HeaderData = {
  search?: {
    placeholder: string
    search_title: string
  },
  trainings?: {
    title: string,
    subtitle?: string,
    items: {
      title: string,
      link: string
      background?: ImageSet
    }[]
  }
}

export default HeaderData