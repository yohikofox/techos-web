import { IImageSetService } from "./imageSet.service"
import { ITagService } from "./tag.service"
import MicroPost from "../model/microPost"
import { MicroPostData, MicroPostListData } from "./dto/micro-post.dto"
import MicroPostList from "../model/microPostList"
import { IMetaService } from "./meta.service"

export interface IMicroPostService {
  mapMicroPost(post: MicroPostData): Promise<MicroPost>
  mapMicroPostList(data: MicroPostListData): Promise<MicroPostList>
}

export default class MicroPostService implements IMicroPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService,
    private metaService: IMetaService,
  ) { }

  async mapMicroPostList(data: MicroPostListData): Promise<MicroPostList> {
    return {
      posts: await Promise.all(data.microPosts.data.map(async (post: any) => (await this.mapMicroPost(post))!)),
      meta: await this.metaService.mapMeta(data.microPosts.meta)
    }
  }

  async mapMicroPost(post: MicroPostData): Promise<MicroPost> {
    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      picture: post.attributes.picture?.data?.attributes && await this.imageSetService.mapImageSet(post.attributes.picture) || undefined,
      // tags: post.attributes.tags && post.attributes.tags.data.map(tag => this.tagService.mapTag(tag)) || undefined,
    }
  }
}
