import PostHelper from "@/infrastructure/helper/postHelper";
import { GraphQLQueries, IContentManagerSystemRepository } from "@biz/adapter/contentManagementSystem";
import Post, { PostType } from "../model/post";
import { IUseCase } from "../useCaseFactory";
import { IImageSetService } from "../services/imageSet.service";
import { Result } from "@/lib/result";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";
import CacheConstants from "R/src/lib/constants/cache";


export enum PostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
  NO_DATA_FOUND = "NO_DATA_FOUND"
}

export default class GetPostDetailsUseCase implements IUseCase<any, Result<Post, PostDetailsResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private imageSetService: IImageSetService
  ) { }
  async execute(request?: any): Promise<Result<Post, PostDetailsResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_DETAILS, request, {
      revalidate: CacheConstants.ONE_DAY,
      tags: [RevalidateTagConstants.POST]
    })

    if (response.IsError) {
      return response.transferError(PostDetailsResult.ERROR)
    }

    if (!response.Value.posts) {
      return response.transferError(PostDetailsResult.NO_DATA_FOUND)
    }

    const result: Post = {
      level: PostHelper.getLevel(response.Value.posts.data[0].attributes.level),
      title: response.Value.posts.data[0].attributes.title,
      slug: response.Value.posts.data[0].attributes.slug,
      content: response.Value.posts.data[0].attributes.content,
      extract: response.Value.posts.data[0].attributes.extract,
      start_at: response.Value.posts.data[0].attributes.start_at,
      type: PostType.Article,
      author: {
        username: response.Value.posts.data[0].attributes.author.data.attributes.username,
        avatar: response.Value.posts.data[0].attributes.author.data.attributes.avatar?.data &&
          await this.imageSetService.mapImageSet(response.Value.posts.data[0].attributes.author.data.attributes.avatar.data.attributes)
      },
      picture: await this.imageSetService.mapImageSet(response.Value.posts.data[0].attributes.picture.data.attributes),
      stats: response.Value.posts.data[0].attributes.post_stat_list?.data && {
        slug: response.Value.posts.data[0].attributes.post_stat_list.data.attributes.slug,
        viewCount: response.Value.posts.data[0].attributes.post_stat_list.data.attributes.view_count,
      }
    }

    return Result.ok(result)
  }
}