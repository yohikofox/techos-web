import Post, { PostType } from "@domain/post"
import { IImageSetService, ImageSetPreset } from "@services/imageSet.service"
import { PostData } from "@dto/post.dto"
import { ITagService } from "@services/tag.service"
import { PictureData } from "@dto/picture.dto"
import { TagData } from "@dto/tag.dto"
import { IPostStatService } from "@services/post-stats.service"
import { PostStatData } from "@dto/post-stat.dto"

export interface IPostService {
  mapPost(post: any): Promise<Post>
}

export default class PostService implements IPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService,
    private postStatService: IPostStatService
  ) { }

  async mapPost(post: PostData): Promise<Post> {
    return {
      id: post.id,
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      extract: post.attributes.extract ?? undefined,
      start_at: post.attributes.start_at,
      type: PostType.Article,
      author: {
        username: post.attributes.author.data.attributes.username,
        avatar: post.attributes.author.data.attributes.avatar?.data &&
          await this.imageSetService.mapImageSet(post.attributes.author.data.attributes.avatar satisfies PictureData)
      },
      picture: post.attributes.picture && await this.imageSetService.mapImageSet(post.attributes.picture satisfies PictureData,
        {
          preset: ImageSetPreset.NONE
        }
      ) || undefined,
      tags: post.attributes.tags?.data ? await Promise.all(post.attributes.tags.data.map(async (tag: TagData) => {
        return this.tagService.mapTag(tag)
      })) : undefined,
      stats: await this.postStatService.mapPostStats(post.attributes.slug, post.attributes.post_stat_list.data satisfies PostStatData)
    }
  }
}
