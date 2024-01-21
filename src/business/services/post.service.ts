import Post, { PostType } from "../model/post"
import { IImageSetService } from "./imageSet.service"
import { PostData } from "./dto/post.dto"
import { ITagService } from "./tag.service"
import { PictureData } from "./dto/picture.dto"
import { TagData } from "./dto/tag.dto"

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
          await this.imageSetService.mapImageSet(post.attributes.author.data.attributes.avatar satisfies PictureData)
      },
      picture: post.attributes.picture && await this.imageSetService.mapImageSet(post.attributes.picture satisfies PictureData) || undefined,
      tags: post.attributes.tags?.data ? await Promise.all(post.attributes.tags.data.map(async (tag: TagData) => {
        return this.tagService.mapTag(tag)
      })) : undefined,
      stats: post.attributes.post_stat_list?.data ? {
        slug: post.attributes.slug,
        viewCount: post.attributes.post_stat_list.data.attributes.view_count,
      } : undefined
    }
  }
}

/**
 * {
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
 */