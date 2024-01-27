const queries = {
  getTagInfos: `
  query tagInfos($slug: StringFilterInput!) {
  tags(filters: { slug: $slug }) {
    data {
      attributes {
        label
        background_color
        color
        hero {
          title
          background {
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
          content
          picture {
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

  `,
  createPostStats: `
mutation createPostStats ($count: Int!, $post:ID!){
  createPostStatList(data: {view_count: $count,post:$post}) {
    data {
      attributes {
        view_count
      }
    }
  }
}
  `,
  updatePostStats: `
mutation updatePostStats ($id:ID!, $count: Int!){
  updatePostStatList(id:$id,data: {view_count: $count}) {
    data {
      attributes {
        view_count
      }
    }
  }
}

  `,
  createWebPushSubscription: `
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
}`
}

import { deleteWebPushSubscription } from "@queries/deleteWebPushSubscription"
import { getHeaderData } from '@queries/getHeaderData';
import { getHomeData } from "@queries/getHomeData"
import { getMicroPostDetails } from '@queries/getMicroPostDetails';
import { getMicroPostList } from "@queries/getMicroPostList"
import { getOfflinePageData } from "@queries/getOfflinePageData"
import { getPostDetails } from "@queries/getPostDetails"
import { getPostList } from "@queries/getPostList"
import { getPostStats } from "@queries/getPostStats"
import { getTagPostList } from "@queries/getTagPostList"
import { getWebPushNotification } from "@queries/getWebPushNotification"
import { getWebPushSubscriptionList } from "@queries/getWebPushSubscriptionList"

const exportable = {
  ...queries,
  getWebPushSubscriptionList,
  getWebPushNotification,
  deleteWebPushSubscription,
  getOfflinePageData,
  getPostDetails,
  getPostList,
  getMicroPostList,
  getMicroPostDetails,
  getHomeData,
  getHeaderData,
  getPostStats,
  getTagPostList,
}

export default exportable