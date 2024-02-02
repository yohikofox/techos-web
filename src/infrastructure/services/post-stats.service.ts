import PostStats from "@domain/postStats";
import { PostStatData } from "@dto/post-stat.dto";

export interface IPostStatService {
  mapPostStats(slug: string, data: PostStatData): Promise<PostStats>;
}

export default class PostStatService implements IPostStatService {
  async mapPostStats(slug: string, data: PostStatData): Promise<PostStats> {
    const result: PostStats = {
      id: data!.id,
      slug: slug,
      viewCount: data?.view_count !== undefined ? data?.view_count : 0,
    };

    return result;
  }
}
