export const getWebPushNotification = `
query getWebPushNotification($notificationId: ID!) {
  webPushNotification(id: $notificationId) {
    data {
      attributes {
        title
        url
        body
        badge {
          data {
            attributes {
              name
              width
              height
              url
              formats
            }
          }
        }
        dir
        lang
        tag
        icon {
          data {
            attributes {
              name
              width
              height
              url
              formats
            }
          }
        }
        image {
          data {
            attributes {
              name
              width
              height
              url
              formats
            }
          }
        }
        data
        actions {
          action
          title
          icon {
            data {
              attributes {
                name
                width
                height
                url
                formats
              }
            }
          }
        }
      }
    }
  }
}
`
