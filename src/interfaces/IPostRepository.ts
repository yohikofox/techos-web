import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import { PostListRequest, PostListResult } from "@app/getPostList";
import Post from "@domain/post";
import PostList from "@domain/postList";
import { Result } from "@lib/result";

export interface IPostRepository {
  findOnePost(request?: PostDetailsRequest): Promise<Result<Post, PostDetailsResult>>
  findPostList(request?: PostListRequest): Promise<Result<PostList, PostListResult>>
}