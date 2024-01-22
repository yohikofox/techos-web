import { z } from 'zod';
import { heroDataSchema } from './hero.dto';

export const homeDataSchema = z.object({
  hero: heroDataSchema
})

export const homePageDataSchema = z.object({
  homePage: z.object({
    data: z.object({
      attributes: homeDataSchema
    })
  })
})

export type HomePageData = z.infer<typeof homePageDataSchema>

export type HomeData = z.infer<typeof homeDataSchema>