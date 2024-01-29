import { FetchOptions } from "@infra/adapter/fetchOptions";
import {
  ContentManagerSystemResult,
  GraphQLQueries,
  IContentManagerSystemRepository,
  RestRequest,
} from "@interfaces/IContentManagerSystemRepository";
import queries from "@queries/index";
import qs from "querystring";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";

export default class ContentManagerSystemRepository
  implements IContentManagerSystemRepository
{
  constructor(private configManager: IConfigManager) {}

  async get<TResult, TRequest>(
    query: GraphQLQueries,
    variables?: TRequest,
    options?: FetchOptions
  ): Promise<Result<TResult, ContentManagerSystemResult>> {
    try {
      const q = queries[query];

      const url = `${await this.configManager.get("CMS_ENDPOINT")}/graphql`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          query: q,
          variables: variables,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.configManager.get("CMS_API_KEY")}`,
        },
        next: {
          revalidate:
            options?.revalidate !== undefined ? options.revalidate : 0,
          tags:
            options?.tags !== undefined
              ? [...options.tags, RevalidateTagConstants.DANGER_GLOBAL]
              : [RevalidateTagConstants.DANGER_GLOBAL],
        },
      });

      if (!response.ok) {
        console.log(
          "CMS Response was not ok.",
          response.status,
          response.statusText
        );
        return Result.error(ContentManagerSystemResult.HTTP_ENDPOINT_ERROR);
      }

      const json = await response.json();

      if (json.errors !== undefined) {
        console.warn("GraphQL query error", JSON.stringify(json.errors));
        return Result.error(ContentManagerSystemResult.RESULT_ENDPOINT_ERROR);
      }

      if (json.data === undefined) {
        console.warn("GraphQL query error", json);
        return Result.error(ContentManagerSystemResult.NO_DATA_FOUND);
      }

      if (options?.schema === undefined) return Result.ok(json.data as TResult);

      const parseResult = options.schema.safeParse(json.data);

      if (parseResult.success !== true) {
        console.warn(
          "GraphQL query parse error",
          parseResult.error.message,
          json.data,
          query
        );
        return Result.error(ContentManagerSystemResult.PARSE_ERROR);
      }

      return Result.ok(parseResult.data as TResult);
    } catch (error) {
      console.error("ContentManagerSystemRepository error", error);
      return Result.error(ContentManagerSystemResult.UNHANDLED_ERROR);
    }
  }

  async find<T>(
    request: RestRequest,
    options?: FetchOptions
  ): Promise<Result<T, ContentManagerSystemResult>> {
    try {
      let url = `${await this.configManager.get("CMS_ENDPOINT")}/api/${request.entityName}`;

      if (request.query) {
        const queryString = qs.stringify(request.query);
        url += `?${queryString}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await this.configManager.get("CMS_API_KEY")}`,
        },
        next: {
          revalidate:
            options?.revalidate !== undefined ? options.revalidate : 0,
          tags:
            options?.tags !== undefined
              ? [...options.tags, RevalidateTagConstants.DANGER_GLOBAL]
              : [RevalidateTagConstants.DANGER_GLOBAL],
        },
      });

      if (response.ok !== true) {
        console.log(
          "CMS Response was not ok.",
          response.status,
          response.statusText
        );
        return Result.error(ContentManagerSystemResult.HTTP_ENDPOINT_ERROR);
      }

      const json = await response.json();

      if (json.errors !== undefined) {
        console.warn("GraphQL query error", JSON.stringify(json.errors));
        return Result.error(ContentManagerSystemResult.RESULT_ENDPOINT_ERROR);
      }

      if (options?.schema === undefined) return Result.ok(json as T);

      const parseResult = options.schema.safeParse(json);

      if (parseResult.success !== true) {
        console.warn(
          "GraphQL query parse error",
          parseResult.error.message,
          json
        );
        return Result.error(ContentManagerSystemResult.PARSE_ERROR);
      }

      return Result.ok(parseResult.data as T);
    } catch (error) {
      console.error("ContentManagerSystemRepository error", error);
      return Result.error(ContentManagerSystemResult.UNHANDLED_ERROR);
    }
  }
}
