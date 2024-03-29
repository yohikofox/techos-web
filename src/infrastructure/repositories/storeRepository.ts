import ProductData from "@dto/product.dto";
import { FetchOptions } from "@infra/adapter/fetchOptions";
import Filterable from "@infra/adapter/filterable";
import { IStoreRepository, StoreResult } from "@infra/store";
import qs, { ParsedUrlQueryInput } from "querystring";

import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";

export default class StoreRepository implements IStoreRepository {
  constructor(private configManager: IConfigManager) {}

  async getProduct(
    request: Filterable,
    options?: FetchOptions
  ): Promise<Result<ProductData, StoreResult>> {
    try {
      const id = request.id;
      delete request.id;
      const schema = options?.schema;
      delete request.schema;

      const q = qs.stringify(request as ParsedUrlQueryInput);

      const url = `${await this.configManager.get("STORE_ENDPOINT")}/products/${id}${q !== undefined ? `?${q}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${await this.configManager.get("STORE_API_KEY")}`
        },
        next: {
          revalidate:
            options?.revalidate !== undefined ? options.revalidate : 0,
          tags: options?.tags || [],
        },
      });

      if (!response.ok) {
        console.info(
          "Store response was not ok.",
          response.status,
          response.statusText
        );
        return Result.error(StoreResult.ERROR);
      }

      const json = await response.json();

      if (schema === undefined) return Result.ok(json as ProductData);

      const parseResult = schema.safeParse(json);

      if (parseResult.success !== true) {
        console.info("GraphQL query error", parseResult.error.message);
        return Result.error(StoreResult.ERROR);
      }

      return Result.ok(parseResult.data);
    } catch (error) {
      console.error("StoreRepository error", error);
      return Result.error(StoreResult.UNHANDLED_ERROR);
    }
  }
}
