import { Result } from "../result"

export enum ContentManagerSystemResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type FetchOptions = {
  revalidate?: number
  tags?: string[]
}

export interface IContentManagerSystemRepository {
  get<T>(query: GraphQLQueries, variables?: any, options?: FetchOptions): Promise<Result<T, ContentManagerSystemResult>>
}

export enum GraphQLQueries {
  GET_HOME_DATA = 'getHomeData',
  GET_HEADER_DATA = 'getHeaderData',
  GET_POST_LIST = 'getPostList',
  GET_POST_DETAILS = 'getPostDetails',
  GET_TAG_POST_LIST = 'getTagPostList',
  GET_TAG_INFOS = 'getTagInfos',
  GET_POST_STATS = 'getPostStats',
  UPDATE_POST_STATS = 'updatePostStats',
  CREATE_POST_STATS = 'createPostStats',
  CREATE_WEB_PUSH_SUBSCRIPTION = 'createWebPushSubscription',
  GET_WEB_PUSH_SUBSCRIPTION_LIST = 'getWebPushSubscriptionList',
  GET_WEB_PUSH_NOTIFICATION = 'getWebPushNotification',
  DELETE_WEB_PUSH_SUBSCRIPTION = 'deleteWebPushSubscription',
  GET_OFFLINE_PAGE_DATA = 'getOfflinePageData',
}