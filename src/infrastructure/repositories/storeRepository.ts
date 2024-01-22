import { IConfigManager } from "@/infrastructure/adapter/configManager";
import { Result } from "@/lib/result";
import { FetchOptions } from "@infra/adapter/fetchOptions";
import { IStoreRepository, StoreResult } from "@infra/store";
import Filterable from "@infra/adapter/filterable";
import ProductData from "@dto/product.dto";
import qs from 'querystring';

export default class StoreRepository implements IStoreRepository {
  constructor(private configManager: IConfigManager) { }

  async getProduct(request: Filterable, options?: FetchOptions): Promise<Result<ProductData, StoreResult>> {
    try {

      const id = request.id
      delete request.id
      const schema = request.schema
      delete request.schema

      const q = qs.stringify(request)

      const url = `${await this.configManager.get("STORE_ENDPOINT")}/products/${id}${q ? `?${q}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${await this.configManager.get("STORE_API_KEY")}`
        },
        next: {
          revalidate: options?.revalidate || 0,
          tags: options?.tags || []
        }
      });

      if (!response.ok) {
        console.log('Store response was not ok.', response.status, response.statusText);
        return Result.error(StoreResult.ERROR)
      }

      const json = await response.json();

      if (!schema) return Result.ok(json as ProductData)

      const parseResult = schema.safeParse(json)

      if (!parseResult.success) {
        console.log('GraphQL query error', parseResult.error.message);
        return Result.error(StoreResult.ERROR)
      }

      return Result.ok(parseResult.data)
    } catch (error) {
      console.error('StoreRepository error', error)
      return Result.error(StoreResult.UNHANDLED_ERROR)
    }
  }
}