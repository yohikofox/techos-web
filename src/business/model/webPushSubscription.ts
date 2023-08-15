type WebPushSubscription = {
  id: number,
  endpoint: string,
  expirationTime?: string,
  keys: {
    p256dh: string,
    auth: string,
  }
}

export default WebPushSubscription