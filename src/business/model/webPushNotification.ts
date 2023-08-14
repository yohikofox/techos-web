import layout from '../../app/layout';
type WebPushNotification = {
  title: string,
  dir: string,
  body: string,
  icon: string,
  badge: string,
  image: string,
  tag: string,
  url: string,
  data: any,
  lang: string,
  actions: {
    action: string,
    title: string,
    icon: string
  }[]
}

export default WebPushNotification