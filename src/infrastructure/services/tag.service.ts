import Tag from "@domain/tag";
import { TagData } from "@dto/tag.dto";
import { IHeroService } from "@infra/services/hero.service";

export interface ITagService {
  mapTag(tag: TagData): Promise<Tag>;
}

export default class TagService implements ITagService {
  constructor(private heroService: IHeroService) {}

  async mapTag(tag: TagData): Promise<Tag> {
    return {
      label: tag.label,
      slug: tag.slug,
      backgroundColor: tag.background_color,
      color: tag.color,
      hero: tag.hero && (await this.heroService.mapToHero(tag.hero)),
    } as Tag;
  }
}
