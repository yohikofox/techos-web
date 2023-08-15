export const deleteWebPushSubscription = `
mutation deleteWebPushSubscription($subscriptionId: ID!) {
  deleteWebPushSubscription(id: $subscriptionId) {
    data {
      id
      attributes{
        endpoint
        expiration_time
        p256dh
        auth
      }
    }
  }
}

`