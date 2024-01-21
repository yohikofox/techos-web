import ImageSet from "./image"

type WebPushNotification = {
  title: string,
  dir: string,
  body: string,
  icon: ImageSet,
  badge: ImageSet,
  image: ImageSet,
  tag: string,
  url: string,
  data: any,
  lang: string,
  actions: {
    action: string,
    title: string,
    icon: ImageSet
  }[]
}

export default WebPushNotification