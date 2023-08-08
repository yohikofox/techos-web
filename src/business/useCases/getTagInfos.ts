import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import Tag from "../model/tag";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";



export enum TagInfosResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TagInfosRequest = {
  slug: any
}

export default class GetTagInfosUseCase implements IUseCase<TagInfosRequest, Result<Tag, TagInfosResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: TagInfosRequest): Promise<Result<Tag, TagInfosResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_INFOS, request)

    if (response.IsError) {
      return response.transferError(TagInfosResult.ERROR)
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
        background: tag.attributes.hero.background?.data && {
          name: tag.attributes.hero.background.data.attributes.name,
          src: tag.attributes.hero.background.data.attributes.url,
          width: tag.attributes.hero.background.data.attributes.width,
          height: tag.attributes.hero.background.data.attributes.height,
        },
        picture: tag.attributes.hero.picture?.data && {
          name: tag.attributes.hero.picture.data.attributes.name,
          src: tag.attributes.hero.picture.data.attributes.url,
          width: tag.attributes.hero.picture.data.attributes.width,
          height: tag.attributes.hero.picture.data.attributes.height,
        }
      }
    }


    return Result.ok(result)
  }
}