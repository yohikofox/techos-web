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
      content: hero.content ?? "",
      picture:
        hero.picture !== undefined && hero.picture !== null
          ? await this.imageSetService.mapImageSet(hero.picture, {
              preset: ImageSetPreset.SMALL,
            })
          : undefined,
      background:
        hero.background !== undefined && hero.background !== null
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
