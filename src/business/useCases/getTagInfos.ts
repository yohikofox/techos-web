import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import Tag from "../model/tag";
import { Result } from "../result";
import { IImageSetService } from "../services/imageSet.service";
import { IUseCase } from "../useCaseFactory";


export enum TagInfosResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export type TagInfosRequest = {
  slug: any
}

export default class GetTagInfosUseCase implements IUseCase<TagInfosRequest, Result<Tag, TagInfosResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: TagInfosRequest): Promise<Result<Tag, TagInfosResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_INFOS, request, { revalidate: 60 * 60 * 1 })

    if (response.IsError) {
      return response.transferError(TagInfosResult.ERROR)
    }

    if (!response.Value.tags) {
      return response.transferError(TagInfosResult.NO_DATA_FOUND)
    }

    const tag = response.Value.tags.data[0]

    const result: Tag = {
      label: tag.attributes.label,
      slug: tag.attributes.slug,
      color: tag.attributes.color,
      backgroundColor: tag.attributes.background_color,
      hero: tag.attributes.hero && {
        title: tag.attributes.hero.title,
        content: tag.attributes.hero.content,
        background: tag.attributes.hero.background?.data &&
          await this.imageSetService.mapImageSet(tag.attributes.hero.background.data.attributes),
        picture: tag.attributes.hero.picture?.data &&
          await this.imageSetService.mapImageSet(tag.attributes.hero.picture.data.attributes)
      }
    }

    return Result.ok(result)
  }
}