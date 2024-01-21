import PostStats from "../model/postStats"
import { PostStatData } from "./dto/post-stat.dto"


export interface IPostStatService {
  mapPostStats(slug: string, data: PostStatData): Promise<PostStats>
}

export default class PostStatService implements IPostStatService {

  async mapPostStats(slug: string, data: PostStatData): Promise<PostStats> {
    const result = {
      slug: slug,
      viewCount: data.data?.attributes.view_count || 0
    }

    return result
  }
}