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

    if (post.attributes.picture !== undefined) {
      picture = await this.imageSetService.mapImageSet(
        post.attributes.picture,
        {
          preset: ImageSetPreset.NONE,
        }
      );
    }

    // post.attributes.picture !== undefined &&
    //   post.attributes.picture !== null &&
    //   (await this.imageSetService.mapImageSet(post.attributes.picture, {
    //     preset: ImageSetPreset.NONE,
    //   }));

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
        avatar:
          post.attributes.author.data.attributes.avatar?.data &&
          (await this.imageSetService.mapImageSet(
            post.attributes.author.data.attributes.avatar satisfies PictureData
          )),
      },
      picture,
      tags:
        post.attributes.tags?.data !== undefined
          ? await Promise.all(
              post.attributes.tags.data.map(async (tag: TagData) => {
                return this.tagService.mapTag(tag);
              })
            )
          : undefined,
      stats: await this.postStatService.mapPostStats(
        post.attributes.slug,
        post.attributes.post_stat_list.data satisfies PostStatData
      ),
    };
  }
}
