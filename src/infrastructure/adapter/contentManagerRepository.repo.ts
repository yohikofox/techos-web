import queries from "./queries";

import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { ContentManagerSystemResult, GraphQLQueries, IContentManagerSystemRepository } from "@/business/adapter/contentManagementSystem";
import { Result } from "@/lib/result";
import { FetchOptions } from "./fetchOptions";

export default class ContentManagerSystemRepository implements IContentManagerSystemRepository {
  constructor(private configManager: IConfigManager) { }

  async get<T>(query: GraphQLQueries, variables?: any, options?: FetchOptions): Promise<Result<T, ContentManagerSystemResult>> {
    try {
      const q = queries[query]

      const url = `${await this.configManager.get("CMS_ENDPOINT")}/graphql`;

      const response = await fetch(url, {
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
        console.log('CMS Response was not ok.', response.status, response.statusText);
        return Result.error(ContentManagerSystemResult.ERROR)
      }

      const json = await response.json();

      if (json.errors) {
        console.log('GraphQL query error', json.errors);
        return Result.error(ContentManagerSystemResult.ERROR)
      }

      if (!json.data) {
        console.log('GraphQL query error', json);
        return Result.error(ContentManagerSystemResult.ERROR)
      }

      if (!options?.schema) return Result.ok(json.data as T)

      const parseResult = options?.schema.safeParse(json.data)

      if (!parseResult.success) {
        console.log('GraphQL query error', parseResult.error.message);
        return Result.error(ContentManagerSystemResult.ERROR)
      }

      return Result.ok(parseResult.data as T)
    } catch (error) {
      console.error('ContentManagerSystemRepository error', error)
      return Result.error(ContentManagerSystemResult.UNHANDLED_ERROR)
    }
  }
}