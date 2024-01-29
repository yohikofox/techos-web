import { ProductRequest, ProductResult } from "@app/getProductById";
import { RandomProductRequest } from "@app/getRandomProduct";
import Product from "@domain/product";
import ProductData, { productDataSchema } from "@dto/product.dto";
import Filterable from "@infra/adapter/filterable";
import { IProductService } from "@infra/services/product.service";
import { IStoreRepository } from "@infra/store";
import { IProductRepository } from "@interfaces/IProductRepository";
import { Result } from "@lib/result";

export default class ProductRepository implements IProductRepository {
  constructor(
    private storeRepository: IStoreRepository,
    private productService: IProductService
  ) {}

  async findOneProduct(
    request?: ProductRequest
  ): Promise<Result<Product, ProductResult>> {
    const response = await this.storeRepository.getProduct(
      {
        ...request,
      } as Filterable,
      { revalidate: 60 * 60 * 1 }
    );

    if (response.IsError === true) {
      return response.transferError(ProductResult.ERROR);
    }

    if (response.Value === undefined) {
      return response.transferError(ProductResult.NO_DATA_FOUND);
    }

    const result: Product = await this.productService.mapProduct(
      response.Value as ProductData
    );

    return Result.ok(result);
  }

  async findRandomProduct(
    request?: RandomProductRequest
  ): Promise<Result<Product, ProductResult>> {
    return this.findOneProduct({
      ...(request !== undefined ? request : {}),
      schema: productDataSchema,
      id: Math.floor(Math.random() * 20),
    } as ProductRequest);
  }
}
