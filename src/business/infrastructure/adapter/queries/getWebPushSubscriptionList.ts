const getWebPushSubscriptionList = `
query getWebPushSubscriptionList {
  webPushSubscriptions {
    data {
      attributes {
        endpoint
        expiration_time
        p256dh
        auth
      }
    }
  }
}

`

export default getWebPushSubscriptionList