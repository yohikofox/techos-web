import { Result } from "@/business/result";
import queries from "./queries";
import { IConfigManager } from "./configManager";

export enum ContentManagerSystemResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IContentManagerSystemRepository {
  get<T>(query: GraphQLQueries, variables?: any): Promise<Result<T, ContentManagerSystemResult>>
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

export default class ContentManagerSystemRepository implements IContentManagerSystemRepository {
  constructor(private configManager: IConfigManager) { }

  async get<T>(query: GraphQLQueries, variables?: any): Promise<Result<T, ContentManagerSystemResult>> {
    const q = queries[query]

    const response = await fetch(`${await this.configManager.get("CMS_ENDPOINT")}/graphql`, {
      method: 'POST',
      body: JSON.stringify({
        query: q,
        variables: variables
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await this.configManager.get("CMS_API_KEY")}`
      },
      cache: 'no-store',
      // next: {
      //   revalidate: 60
      // }
    });

    if (!response.ok) {
      console.log('Network response was not ok.', response.status, response.statusText);
      return Result.error(ContentManagerSystemResult.ERROR)
    }

    const json = await response.json();
    return Result.ok(json.data)
  }
}