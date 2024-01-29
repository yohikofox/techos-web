import { ProductRequest, ProductResult } from "@app/getProductById";
import { RandomProductRequest } from "@app/getRandomProduct";
import Product from "@domain/product";
import { Result } from "@lib/result";

export interface IProductRepository {
  findOneProduct(request?: ProductRequest): Promise<Result<Product, ProductResult>>
  findRandomProduct(request?: RandomProductRequest): Promise<Result<Product, ProductResult>>
}