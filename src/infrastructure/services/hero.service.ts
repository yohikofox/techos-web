import Hero from "@domain/hero";
import { HeroData } from "@dto/hero.dto";
import { PictureData } from "@dto/picture.dto";
import { IImageSetService, ImageSetPreset } from "@services/imageSet.service";

export interface IHeroService {
  mapToHero(hero: HeroData): Promise<Hero>;
}

export default class HeroService implements IHeroService {
  constructor(private imageSetService: IImageSetService) {}

  async mapToHero(hero: HeroData): Promise<Hero> {
    return {
      title: hero.title,
      content: hero.content,
      picture: hero.picture?.data
        ? await this.imageSetService.mapImageSet(
            hero.picture satisfies PictureData,
            {
              preset: ImageSetPreset.SMALL,
            }
          )
        : undefined,
      background: hero.background?.data
        ? await this.imageSetService.mapImageSet(
            hero.background satisfies PictureData,
            {
              preset: ImageSetPreset.NONE,
            }
          )
        : undefined,
    };
  }
}
