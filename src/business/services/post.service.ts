import Post, { PostType } from "../model/post"
import { IImageSetService } from "./imageSet.service"
import { PostData } from "./dto/post.dto"
import { ITagService } from "./tag.service"

export interface IPostService {
  mapPost(post: any): Promise<Post>
}

export default class PostService implements IPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService
  ) { }

  async mapPost(post: PostData): Promise<Post> {
    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      extract: post.attributes.extract ?? undefined,
      start_at: post.attributes.start_at,
      type: PostType.Article,
      author: {
        username: post.attributes.author.data.attributes.username,
        avatar: post.attributes.author.data.attributes.avatar?.data &&
          await this.imageSetService.mapImageSet(post.attributes.author.data.attributes.avatar.data.attributes)
      },
      picture: post.attributes.picture && await this.imageSetService.mapImageSet(post.attributes.picture.data.attributes) || undefined,
      tags: post.attributes.tags.data.map((tag: any) => {
        return this.tagService.mapTag(tag)
      }),
      stats: post.attributes.post_stat_list?.data ? {
        slug: post.attributes.slug,
        viewCount: post.attributes.post_stat_list.data.attributes.view_count,
      } : undefined
    }
  }
}
