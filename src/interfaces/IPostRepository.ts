import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import Post from "@domain/post";
import PostList from "@domain/postList";
import { Result } from "@lib/result";

import { PostListResult } from "../application/getPostList";
import { PostListRequest } from "../application/requests/postList.request";

export interface IPostRepository {
  findOnePost(
    request?: PostDetailsRequest
  ): Promise<Result<Post, PostDetailsResult>>;
  findPostList(
    request?: PostListRequest
  ): Promise<Result<PostList, PostListResult>>;
}
