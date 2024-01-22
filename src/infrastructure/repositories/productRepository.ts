import { ProductRequest, ProductResult } from "@app/getProductById"
import Product from "@domain/product"
import { Result } from "@lib/result"
import { IStoreRepository } from "@infra/store"
import { IProductService } from "@infra/services/product.service"
import Filterable from "@infra/adapter/filterable"
import ProductData, { productDataSchema } from "@dto/product.dto"
import { IProductRepository } from "@interfaces/IProductRepository"

export default class ProductRepository implements IProductRepository {
  constructor(
    private storeRepository: IStoreRepository,
    private productService: IProductService,
  ) { }

  async findOneProduct(request?: any): Promise<Result<Product, ProductResult>> {
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

  async findRandomProduct(request?: any): Promise<Result<Product, ProductResult>> {
    return this.findOneProduct({
      ...(request || {}),
      schema: productDataSchema,
      id: Math.floor(Math.random() * 20)
    } as ProductRequest)
  }
}