import { IImageSetService } from "./imageSet.service"
import { ITagService } from "./tag.service"
import MicroPost from "../model/microPost"
import { MicroPostData } from "./dto/micro-post.dto"

export interface IMicroPostService {
  mapMicroPost(post: MicroPostData): Promise<MicroPost | undefined>
}

export default class MicroPostService implements IMicroPostService {
  constructor(
    private imageSetService: IImageSetService,
    private tagService: ITagService
  ) { }

  async mapMicroPost(post: MicroPostData): Promise<MicroPost | undefined> {

    if (!post?.attributes) return undefined

    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      content: post.attributes.content,
      picture: post.attributes.picture?.data?.attributes && await this.imageSetService.mapImageSet(post.attributes.picture.data.attributes) || undefined,
      // tags: post.attributes.tags && post.attributes.tags.data.map(tag => this.tagService.mapTag(tag)) || undefined,
    }
  }
}
