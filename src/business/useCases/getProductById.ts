import { IUseCase } from "../useCaseFactory";
import { Result } from "@/lib/result";
import Product from "../model/product";
import { IStoreRepository } from "../adapter/store";
import ProductData from "../services/dto/product.dto";
import Filterable from "R/src/infrastructure/adapter/filterable";
import { IProductService } from "../services/product.service";


export enum ProductResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type ProductRequest = {} & Filterable

export default class GetProductByIdUseCase implements IUseCase<ProductRequest, Result<Product, ProductResult>> {
  constructor(
    private storeRepository: IStoreRepository,
    private productService: IProductService
  ) { }
  async execute(request?: ProductRequest): Promise<Result<Product, ProductResult>> {
    const response = await this.storeRepository.getProduct({
      ...request
    } as Filterable, { revalidate: 60 * 60 * 1 })

    if (response.IsError) {
      return response.transferError(ProductResult.ERROR)
    }

    if (!response.Value) {
      return response.transferError(ProductResult.NO_DATA_FOUND)
    }

    const result: Product = await this.productService.mapProduct(response.Value as ProductData)

    return Result.ok(result)
  }
}