import { ProductResult } from "@app/getProductById";
import Product from "@domain/product";
import Filterable from "@infra/adapter/filterable";
import { IProductRepository } from "@interfaces/IProductRepository";

import { Result } from "@/lib/result";

export type RandomProductRequest = {} & Filterable

export default class GetRandomProductUseCase {

  constructor(private productRepository: IProductRepository,) { }

  async execute(request?: RandomProductRequest): Promise<Result<Product, ProductResult>> {
    return this.productRepository.findRandomProduct(request)
  }
}