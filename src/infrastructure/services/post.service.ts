import Post, { PostType } from "@domain/post";
import { PictureData } from "@dto/picture.dto";
import { PostData } from "@dto/post.dto";
import { PostStatData } from "@dto/post-stat.dto";
import { TagData } from "@dto/tag.dto";
import { IImageSetService, ImageSetPreset } from "@services/imageSet.service";
import { IPostStatService } from "@services/post-stats.service";
import { ITagService } from "@services/tag.service";

export interface IPostService {
  mapPost(post: PostData): Promise<Post>;
}

export default class PostService implements IPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService,
    private postStatService: IPostStatService
  ) {}

  async mapPost(post: PostData): Promise<Post> {
    let picture = {};

    if (post.picture !== undefined) {
      picture = await this.imageSetService.mapImageSet(post.picture, {
        preset: ImageSetPreset.NONE,
      });
    }

    // post.attributes.picture !== undefined &&
    //   post.attributes.picture !== null &&
    //   (await this.imageSetService.mapImageSet(post.attributes.picture, {
    //     preset: ImageSetPreset.NONE,
    //   }));

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      extract: post.extract ?? undefined,
      start_at: post.start_at,
      type: PostType.Article,
      author: {
        username: post.author.username,
        avatar:
          post.author.avatar !== undefined
            ? await this.imageSetService.mapImageSet(
                post.author.avatar satisfies PictureData
              )
            : undefined,
      },
      picture,
      tags:
        post.tags.items !== undefined
          ? await Promise.all(
              post.tags.items.map(async (tag: TagData) => {
                return this.tagService.mapTag(tag);
              })
            )
          : undefined,
      stats: await this.postStatService.mapPostStats(
        post.slug,
        post.post_stat_list satisfies PostStatData
      ),
    };
  }
}
