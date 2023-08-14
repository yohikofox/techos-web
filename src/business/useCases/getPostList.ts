import PostHelper from "@/utils/helper/postHelper";
import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import { PostType } from "../model/post";
import PostList from "../model/postList";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";
import { IImageSetService } from "../services/imageSet.service";
import { IPostService } from "../services/post.service";



export enum PostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PostListRequest = {
  index?: number,
  limit?: number
}

export default class GetPostListUseCase implements IUseCase<PostListRequest, Result<PostList, PostListResult>> {
  constructor(
    private cmsRepository: IContentManagerSystemRepository,
    private postService: IPostService
  ) { }
  async execute(request?: PostListRequest): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_LIST, request)

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR)
    }
    const result: PostList = {
      posts: await Promise.all(response.Value.posts.data.map(async (post: any) => await this.postService.mapPost(post))),
      meta: {
        pagination: {
          page: response.Value.posts.meta.pagination.page,
          pageSize: response.Value.posts.meta.pagination.pageSize,
          pageCount: response.Value.posts.meta.pagination.pageCount,
          total: response.Value.posts.meta.pagination.total,
        }
      }
    }

    return Result.ok(result)
  }
}

/**return {
        level: PostHelper.getLevel(post.attributes.level),
        title: post.attributes.title,
        slug: post.attributes.slug,
        content: post.attributes.content,
        extract: post.attributes.extract,
        start_at: post.attributes.start_at,
        type: PostType.Article,
        author: {
          username: post.attributes.author.data.attributes.username
        },
        picture: await this.imageSetService.mapImageSet(post.attributes.picture.data.attributes),
        tags: post.attributes.tags.data.map((tag: any) => {
          return {
            label: tag.attributes.label,
            slug: tag.attributes.slug,
            color: tag.attributes.color,
            backgroundColor: tag.attributes.background_color
          }
        }),
        stats: post.attributes.post_stat_list?.data && {
          slug: post.attributes.slug,
          viewCount: post.attributes.post_stat_list.data.attributes.view_count,
        }
      }
    })) */