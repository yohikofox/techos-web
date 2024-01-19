const queries = {
  getTagPostList: `
query tagPostList($tag: StringFilterInput!, $index: Int!, $limit: Int!) {
  posts(
    filters: { tags: { slug: $tag } }
    sort: "start_at:desc"
    pagination: { start: $index, limit: $limit }
  ) {
    data {
      attributes {
        level
        author {
          data {
            attributes {
              username
            }
          }
        }
        tags {
          data {
            attributes {
              label
              background_color
              color
              slug
            }
          }
        }
        title
        slug
        content
        extract
        start_at
        picture {
          data {
            attributes {
              name
              url
              width
              height
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}

  `,
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
              }
            }
          }
        }
      }
    }
  }
}

  `,
  getPostStats: `
query getPostStats($slug: StringFilterInput!) {
  postStatLists(filters: { post: { slug: $slug } }) {
    data {
      id
      attributes {
        view_count
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
}

  `
}

import { deleteWebPushSubscription } from "@/infrastructure/adapter/queries/deleteWebPushSubscription"
import { getOfflinePageData } from "@/infrastructure/adapter/queries/getOfflinePageData"
import { getWebPushNotification } from "@/infrastructure/adapter/queries/getWebPushNotification"
import { getWebPushSubscriptionList } from "@/infrastructure/adapter/queries/getWebPushSubscriptionList"
import { getPostList } from "@/infrastructure/adapter/queries/getPostList"
import { getMicroPostList } from "@/infrastructure/adapter/queries/getMicroPostList"
import { getPostDetails } from "./queries/getPostDetails"
import { getMicroPostDetails } from './queries/getMicroPostDetails';
import { getHomeData } from "./queries/getHomeData"
import { getHeaderData } from './queries/getHeaderData';

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
}

export default exportable