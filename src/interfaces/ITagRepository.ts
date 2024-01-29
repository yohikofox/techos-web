import { TagInfosRequest, TagInfosResult } from "@app/getTagInfos";
import { TagPostListRequest, TagPostListResult } from "@app/getTagPostList";
import PostList from "@domain/postList";
import Tag from "@domain/tag";
import { Result } from "@lib/result";

export interface ITagRepository {
  findTag(request?: TagInfosRequest): Promise<Result<Tag, TagInfosResult>>
  findTagPostList(request?: TagPostListRequest): Promise<Result<PostList, TagPostListResult>>
}