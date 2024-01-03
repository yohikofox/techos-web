import Filterable from "R/src/infrastructure/adapter/filterable";
import ProductData from "../services/dto/product.dto";
import { FetchOptions } from "R/src/infrastructure/adapter/fetchOptions";
import { Result } from "R/src/lib/result";

export enum StoreResult {
  SUCCESS = 'success',
  ERROR = 'error',
  UNHANDLED_ERROR = 'unhandled_error',
}

export interface IStoreRepository {
  getProduct(request: Filterable, options: FetchOptions): Promise<Result<ProductData, StoreResult>>;
}