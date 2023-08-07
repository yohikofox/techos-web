import { Result } from "@/business/result";
import queries from "./queries";

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
}

export default class ContentManagerSystemRepository implements IContentManagerSystemRepository {
  async get<T>(query: GraphQLQueries, variables?: any): Promise<Result<T, ContentManagerSystemResult>> {

    const q = queries[query]

    const response = await fetch('http://localhost:1337/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: q,
        variables: variables
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 20832abfa12e272e6e3fdd2e7ee312f1e0d5300ef71ae876eab37aa539e7b3e58c7018493570a9e0792dc921e70d450505a06a5b4335e34c93772b96aaa1cfa8dd7fc2a700cd5901da7ec6f84fb5aa6ad3ec93df0df72e24bef6ac73a738a754b0507f63fbe1e9f3d22b27e57461e662520d3f37b0e7ad9ca2d82db4a9b1b886"
      }
    });

    if (!response.ok) {
      console.log('Network response was not ok.', response.status, response.statusText);
      return Result.error(ContentManagerSystemResult.ERROR)
    }

    const json = await response.json();
    return Result.ok(json.data)
  }
}