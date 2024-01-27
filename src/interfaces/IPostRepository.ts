import { PostDetailsResult } from "@app/getPostDetails";
import Post from "@domain/post";
import { Result } from "@lib/result";

import { PostListResult } from "../application/getPostList";
import PostList from "../domain/postList";

export interface IPostRepository {
  findOnePost(request?: any): Promise<Result<Post, PostDetailsResult>>
  findPostList(request?: any): Promise<Result<PostList, PostListResult>>
}