import { z } from "zod"
/**
{
"id": 5,
"title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
"price": 695,
"description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
"category": "jewelery",
"image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
"rating": {
"rate": 4.6,
"count": 400
}
}
*/
export const productDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number()
  }),
})

type ProductData = z.infer<typeof productDataSchema>

export default ProductData
