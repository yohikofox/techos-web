import { Result } from "@/lib/result";
import Product from "@domain/product";
import Filterable from "@infra/adapter/filterable";
import { ProductResult } from "@app/getProductById";
import { IProductRepository } from "@interfaces/IProductRepository";

export type RandomProductRequest = {} & Filterable

export default class GetRandomProductUseCase {

  constructor(private productRepository: IProductRepository,) { }

  async execute(request?: RandomProductRequest): Promise<Result<Product, ProductResult>> {
    return this.productRepository.findRandomProduct(request)
  }
}