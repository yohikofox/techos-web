import Training from "./training"

type Header = {
  search?: {
    placeholder: string
    search_title: string
  },
  trainings?: {
    title: string,
    subtitle?: string,
    items: Training[]
  }
}

export default Header