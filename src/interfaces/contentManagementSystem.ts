import { Result } from "@/lib/result"
import { FetchOptions } from "@infra/adapter/fetchOptions"


export enum ContentManagerSystemResult {
  SUCCESS = 'success',
  ERROR = 'error',
  UNHANDLED_ERROR = 'unhandled_error',
  PARSE_ERROR = 'parse_error',
  NO_DATA_FOUND = 'no_data_found',
  RESULT_ENDPOINT_ERROR = 'result_endpoint_error',
  HTTP_ENDPOINT_ERROR = 'http_endpoint_error',
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
  GET_MICRO_POST_LIST = 'getMicroPostList',
  GET_MICRO_POST_DETAILS = 'getMicroPostDetails',
}

