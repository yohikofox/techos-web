import Post, { PostType } from "../model/post"
import { IImageSetService } from "./imageSet.service"
import { PostData } from "./dto/post.dto"

export interface IPostService {
  mapPost(post: any): Promise<Post>
}

export default class PostService implements IPostService {
  constructor(
    private imageSetService: IImageSetService
  ) { }

  async mapPost(post: PostData): Promise<Post> {
    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      extract: post.attributes.extract,
      start_at: post.attributes.start_at,
      type: PostType.Article,
      author: {
        username: post.attributes.author.data.attributes.username,
        avatar: post.attributes.author.data.attributes.avatar?.data &&
          await this.imageSetService.mapImageSet(post.attributes.author.data.attributes.avatar.data.attributes)
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
      stats: post.attributes.post_stat_list?.data ? {
        slug: post.attributes.slug,
        viewCount: post.attributes.post_stat_list.data.attributes.view_count,
      } : undefined
    }
  }
}
