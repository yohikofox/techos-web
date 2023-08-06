import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import PostList from "../model/postList";
import { Result } from "../result";
import { IUseCase } from "../useCaseFactory";



export enum PostListResult {
  SUCCESS = 'success',
  ERROR = 'error',
}

export default class GetPostListUseCase implements IUseCase<any, Result<PostList, PostListResult>> {
  constructor(private cmsRepository: IContentManagerSystemRepository) { }
  async execute(request?: any): Promise<Result<PostList, PostListResult>> {
    const response = await this.cmsRepository.get<any>(GraphQLQueries.GET_POST_LIST, request)

    if (response.IsError) {
      return response.transferError(PostListResult.ERROR)
    }

    const result: PostList = {
      posts: response.Value.posts.data.map((post: any) => {

        return {
          title: post.attributes.title,
          slug: post.attributes.slug,
          content: post.attributes.content,
          extract: post.attributes.extract,
          start_at: post.attributes.start_at,
          author: {
            username: post.attributes.author.data.attributes.username
          },
          picture: {
            src: post.attributes.picture.data.attributes.url,
            width: post.attributes.picture.data.attributes.width,
            height: post.attributes.picture.data.attributes.height,
            name: post.attributes.picture.data.attributes.name,
          }
        }
      })
    }

    return Result.ok(result)
  }
}