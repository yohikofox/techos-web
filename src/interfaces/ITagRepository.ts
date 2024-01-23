import { TagInfosResult } from "@app/getTagInfos";
import { Result } from "@lib/result";
import Tag from "@domain/tag";
import PostList from "@domain/postList";
import { TagPostListResult } from "@app/getTagPostList";

export interface ITagRepository {
  findTag(request?: any): Promise<Result<Tag, TagInfosResult>>
  findTagPostList(request?: any): Promise<Result<PostList, TagPostListResult>>
}