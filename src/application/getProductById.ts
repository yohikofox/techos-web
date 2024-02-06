import Product from "@domain/product";
import Filterable from "@infra/adapter/filterable";
import { IUseCase } from "@infra/useCaseFactory";
import { IProductRepository } from "@interfaces/IProductRepository";
import { Result } from "@lib/result";

export enum ProductResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "NO_DATA_FOUND",
}

export type ProductRequest = Filterable;

export default class GetProductByIdUseCase
  implements IUseCase<ProductRequest, Result<Product, ProductResult>>
{
  constructor(private productRepository: IProductRepository) {}
  async execute(
    request?: ProductRequest
  ): Promise<Result<Product, ProductResult>> {
    return this.productRepository.findOneProduct(request);
  }
}
