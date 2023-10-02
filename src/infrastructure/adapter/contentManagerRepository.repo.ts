import queries from "./queries";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { ContentManagerSystemResult, FetchOptions, GraphQLQueries, IContentManagerSystemRepository } from "@/business/adapter/contentManagementSystem";
import { Result } from "@/lib/result";


export default class ContentManagerSystemRepository implements IContentManagerSystemRepository {
  constructor(private configManager: IConfigManager) { }

  async get<T>(query: GraphQLQueries, variables?: any, options?: FetchOptions): Promise<Result<T, ContentManagerSystemResult>> {
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
      next: {
        revalidate: options?.revalidate || 0,
        tags: options?.tags || []
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