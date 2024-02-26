import { IConfigManager } from "@infra/adapter/configManager";
import { FetchOptions } from "@infra/adapter/fetchOptions";
import {
  ContentManagerSystemResult,
  GraphQLQueries,
  IContentManagerSystemRepository,
  RestRequest,
} from "@interfaces/IContentManagerSystemRepository";
import RevalidateTagConstants from "@lib/constants/revalidateTag";
import fetch from "@lib/fetch";
import { Result } from "@lib/result";
import { defaultInstance } from "@lib/zod";
import queries from "@queries/index";
import qs from "querystring";
import { z } from "zod";

export default class ContentManagerSystemRepository
  implements IContentManagerSystemRepository
{
  constructor(private configManager: IConfigManager) {}

  async get<TResult, TRequest>(
    query: GraphQLQueries,
    variables?: TRequest,
    options?: FetchOptions
  ): Promise<Result<TResult, ContentManagerSystemResult>> {
    if (process.env.BUILD_MODE === "true" && options?.schema !== undefined)
      return Result.ok(
        defaultInstance(options?.schema as z.AnyZodObject) as TResult
      );
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
        queryMode: true,
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
        console.info(
          "CMS Response was not ok:",
          response.status,
          response.statusText,
          query,
          variables
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

      const untranformedData = await this.unTransformedData(json.data);

      if (process.env.BUILD_MODE === "true" || options?.schema === undefined)
        return Result.ok(untranformedData as TResult);

      const parseResult = options.schema.safeParse(untranformedData);

      if (parseResult.success !== true) {
        console.error(
          "GraphQL query parse error",
          parseResult.error.message,
          JSON.stringify(untranformedData, null, 4),
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
    if (process.env.BUILD_MODE === "true" && options?.schema !== undefined)
      return Result.ok(defaultInstance(options?.schema as z.AnyZodObject) as T);
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
        console.info(
          "CMS Response was not ok.",
          response.status,
          response.statusText,
          url,
          JSON.stringify(request, null, 2)
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

  public async unTransformedData<T>(data: unknown): Promise<unknown> {
    /**
     * If data is undefined or null, return data
     */
    if (data === undefined || data === null) return data;

    /**
     * If data is not an object, return data
     */
    if (typeof data !== "object") {
      return data;
    }

    /**
     * If data is an array, return a Promise.all of the array
     */
    if (Array.isArray(data) === true) {
      const arrayData = (await Promise.all(
        (data as Array<unknown>).map(
          async (item) => await this.unTransformedData(item)
        )
      )) as T;
      return arrayData;
    }

    /**
     * handling object
     */

    const keys = Object.keys(data as object) as string[];

    for (const key of keys) {
      const currentValue = (data as { [key: string]: unknown })[key];

      const isArray = Array.isArray(currentValue);

      if (key === "data" || key === "attributes") {
        if (isArray) {
          (data as { [key: string]: unknown })["items"] =
            await this.unTransformedData(currentValue);
        } else {
          data = {
            ...(data as object),
            ...((await this.unTransformedData(currentValue)) as object),
          };
        }
        delete (data as { [key: string]: unknown })[key];
      } else {
        (data as { [key: string]: unknown })[key] =
          await this.unTransformedData(currentValue);
      }
    }
    // return { ...(data as { [key: string]: unknown }) };
    return data as { [key: string]: unknown };
  }
}
