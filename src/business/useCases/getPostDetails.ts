import { GraphQLQueries, IContentManagerSystemRepository } from "../infrastructure/adapter/contentManagerRepository.repo";
import Post from "../model/post";
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
      title: response.Value.posts.data[0].attributes.title,
      slug: response.Value.posts.data[0].attributes.slug,
      content: response.Value.posts.data[0].attributes.content,
      extract: response.Value.posts.data[0].attributes.extract,
      start_at: response.Value.posts.data[0].attributes.start_at,
      author: {
        username: response.Value.posts.data[0].attributes.author.data.attributes.username
      },
      picture: {
        src: response.Value.posts.data[0].attributes.picture.data.attributes.url,
        width: response.Value.posts.data[0].attributes.picture.data.attributes.width,
        height: response.Value.posts.data[0].attributes.picture.data.attributes.height,
        name: response.Value.posts.data[0].attributes.picture.data.attributes.name,
      }
    }

    return Result.ok(result)
  }
}