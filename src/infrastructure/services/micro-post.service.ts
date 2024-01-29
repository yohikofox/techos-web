import MicroPost from "@domain/microPost";
import MicroPostList from "@domain/microPostList";
import { MicroPostData, MicroPostListData } from "@dto/micro-post.dto";

import { IImageSetService, ImageSetPreset } from "./imageSet.service";
import { IMetaService } from "./meta.service";
import { ITagService } from "./tag.service";

export interface IMicroPostService {
  mapMicroPost(post: MicroPostData): Promise<MicroPost>;
  mapMicroPostList(data: MicroPostListData): Promise<MicroPostList>;
}

export type MicroPostOptions = {
  image_preset?: ImageSetPreset;
};

export default class MicroPostService implements IMicroPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService,
    private metaService: IMetaService
  ) {}

  async mapMicroPostList(data: MicroPostListData): Promise<MicroPostList> {
    return {
      posts: await Promise.all(
        data.microPosts.data.map(
          async (post: MicroPostData) =>
            (await this.mapMicroPost(post, {
              image_preset: ImageSetPreset.SMALL,
            }))!
        )
      ),
      meta: await this.metaService.mapMeta(data.microPosts.meta),
    };
  }

  async mapMicroPost(
    post: MicroPostData,
    options?: MicroPostOptions
  ): Promise<MicroPost> {
    let picture = {};

    if (post.attributes.picture !== undefined) {
      picture = await this.imageSetService.mapImageSet(
        post.attributes.picture,
        {
          preset:
            options?.image_preset !== undefined
              ? options.image_preset
              : ImageSetPreset.NONE,
        }
      );
    }

    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      picture,
      // tags: post.attributes.tags && post.attributes.tags.data.map(tag => this.tagService.mapTag(tag)) || undefined,
    };
  }
}
