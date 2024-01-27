import { TagInfosResult } from "@app/getTagInfos";
import { TagPostListResult } from "@app/getTagPostList";
import PostList from "@domain/postList";
import Tag from "@domain/tag";
import { Result } from "@lib/result";

export interface ITagRepository {
  findTag(request?: any): Promise<Result<Tag, TagInfosResult>>
  findTagPostList(request?: any): Promise<Result<PostList, TagPostListResult>>
}