import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import { PostType } from "../model/post";
import PostList from "../model/postList";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";



export enum TagPostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TagPostListRequest = {
  tag: any
  index?: number
  limit?: number
}

export default class GetTagPostListUseCase implements IUseCase<TagPostListRequest, Result<PostList, TagPostListResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: TagPostListRequest): Promise<Result<PostList, TagPostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_TAG_POST_LIST, request)

    if (response.IsError) {
      return response.transferError(TagPostListResult.ERROR)
    }

    const result: PostList = {
      posts: response.Value.posts.data.map((post: any) => {

        return {
          title: post.attributes.title,
          slug: post.attributes.slug,
          content: post.attributes.content,
          extract: post.attributes.extract,
          start_at: post.attributes.start_at,
          type: PostType.Article,
          author: {
            username: post.attributes.author.data.attributes.username
          },
          picture: {
            src: post.attributes.picture.data.attributes.url,
            width: post.attributes.picture.data.attributes.width,
            height: post.attributes.picture.data.attributes.height,
            name: post.attributes.picture.data.attributes.name,
          },
          tags: post.attributes.tags.data.map((tag: any) => {
            return {
              label: tag.attributes.label,
              slug: tag.attributes.slug,
              color: tag.attributes.color,
              backgroundColor: tag.attributes.background_color
            }
          })
        }
      }),
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