import Product from "@domain/product";
import ProductData from "@dto/product.dto";

export interface IProductService {
  mapProduct(product: ProductData): Promise<Product>
}


export default class ProductService implements IProductService {
  async mapProduct(product: ProductData) {
    const result = {
      ...product,
      price: product.price / 100,
      rating: {
        ...product.rating,
        rate: product.rating.rate / 100
      }
    } satisfies Product
    return result
  }
}