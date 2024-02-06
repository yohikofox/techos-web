import Tag from "@domain/tag";
import { IUseCase } from "@infra/useCaseFactory";
import { ContentManagerFilter } from "@interfaces/IContentManagerSystemRepository";
import { ITagRepository } from "@interfaces/ITagRepository";
import { Result } from "@lib/result";

export enum TagInfosResult {
  SUCCESS = "success",
  ERROR = "error",
  NO_DATA_FOUND = "NO_DATA_FOUND",
}

export type TagInfosRequest = {
  slug: ContentManagerFilter;
};

export default class GetTagInfosUseCase
  implements IUseCase<TagInfosRequest, Result<Tag, TagInfosResult>>
{
  constructor(private tagRepository: ITagRepository) {}
  async execute(
    request?: TagInfosRequest
  ): Promise<Result<Tag, TagInfosResult>> {
    return this.tagRepository.findTag(request);
  }
}
