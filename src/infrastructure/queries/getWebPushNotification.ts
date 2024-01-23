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
              url
              width
              height
              alternativeText
              caption
              size
              mime
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
              url
              width
              height
              alternativeText
              caption
              size
              mime
              formats
            }
          }
        }
        image {
          data {
            attributes {
              name
              url
              width
              height
              alternativeText
              caption
              size
              mime
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
                url
                width
                height
                alternativeText
                caption
                size
                mime
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
