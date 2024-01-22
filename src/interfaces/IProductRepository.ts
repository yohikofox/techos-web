import { ProductResult } from "@app/getProductById";
import Product from "@domain/product";
import { Result } from "@lib/result";

export interface IProductRepository {
  findOneProduct(request?: any): Promise<Result<Product, ProductResult>>
  findRandomProduct(request?: any): Promise<Result<Product, ProductResult>>
}