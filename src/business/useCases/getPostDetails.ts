import PostHelper from "@/utils/helper/postHelper";
import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import Post, { PostType } from "../model/post";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";

export enum PostDetailsResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetPostDetailsUseCase implements IUseCase<any, Result<Post, PostDetailsResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: any): Promise<Result<Post, PostDetailsResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_DETAILS, request)

    if (response.IsError) {
      return response.transferError(PostDetailsResult.ERROR)
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
        avatar: response.Value.posts.data[0].attributes.author.data.attributes.avatar?.data && {
          src: response.Value.posts.data[0].attributes.author.data.attributes.avatar.data.attributes.url,
          width: response.Value.posts.data[0].attributes.author.data.attributes.avatar.data.attributes.width,
          height: response.Value.posts.data[0].attributes.author.data.attributes.avatar.data.attributes.height,
          name: response.Value.posts.data[0].attributes.author.data.attributes.avatar.data.attributes.name,
        }
      },
      picture: {
        src: response.Value.posts.data[0].attributes.picture.data.attributes.url,
        width: response.Value.posts.data[0].attributes.picture.data.attributes.width,
        height: response.Value.posts.data[0].attributes.picture.data.attributes.height,
        name: response.Value.posts.data[0].attributes.picture.data.attributes.name,
      },
      stats: response.Value.posts.data[0].attributes.post_stat_list?.data && {
        slug: response.Value.posts.data[0].attributes.post_stat_list.data.attributes.slug,
        viewCount: response.Value.posts.data[0].attributes.post_stat_list.data.attributes.view_count,
      }
    }

    return Result.ok(result)
  }
}