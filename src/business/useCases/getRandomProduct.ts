import { Result } from "@/lib/result";
import Product from "../model/product";
import { IStoreRepository } from "../adapter/store";
import Filterable from "R/src/infrastructure/adapter/filterable";
import GetProductByIdUseCase, { ProductRequest, ProductResult } from "./getProductById";
import { IProductService } from "../services/product.service";
import { productDataSchema } from "../services/dto/product.dto";

export type RandomProductRequest = {} & Filterable

export default class GetRandomProductUseCase extends GetProductByIdUseCase {
  constructor(storeRepository: IStoreRepository, productService: IProductService) {
    super(storeRepository, productService)
  }
  async execute(request?: RandomProductRequest): Promise<Result<Product, ProductResult>> {
    return super.execute({
      ...(request || {}),
      schema: productDataSchema,
      id: Math.floor(Math.random() * 20)
    } as ProductRequest)
  }
}