import Tag from "@domain/tag";
import { TagData } from "@dto/tag.dto";
import { IHeroService } from "@infra/services/hero.service";

export interface ITagService {
  mapTag(tag: TagData): Promise<Tag>
}

export default class TagService implements ITagService {
  constructor(
    private heroService: IHeroService,
  ) { }

  async mapTag(tag: TagData): Promise<Tag> {
    return {
      label: tag.attributes.label,
      slug: tag.attributes.slug,
      backgroundColor: tag.attributes.background_color,
      color: tag.attributes.color,
      hero: tag.attributes.hero && await this.heroService.mapToHero(tag.attributes.hero)
    } as Tag
  }
}