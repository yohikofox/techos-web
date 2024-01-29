export const createWebPushSubscription = `
mutation createWebPushSubscription($data: WebPushSubscriptionInput!) {
  createWebPushSubscription(data: $data) {
    data {
      attributes {
        endpoint
        expiration_time
        p256dh
        auth
        publishedAt
      }
    }
  }
}`;
