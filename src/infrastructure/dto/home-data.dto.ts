import { heroDataSchema } from "@dto/hero.dto";
import { z } from "zod";

export const homeDataSchema = z.object({
  hero: heroDataSchema,
});

export const homePageDataSchema = z.object({
  homePage: homeDataSchema,
});

export type HomePageData = z.infer<typeof homePageDataSchema>;

export type HomeData = z.infer<typeof homeDataSchema>;
