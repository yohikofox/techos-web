import Post, { PostType } from "@domain/post";

import PostCardAd from "./parts/Ad";
import Article from "./parts/Article";

export interface PostCardProps {
  post: Partial<Post>;
  index: number;
}

export default function Component({ post, index }: PostCardProps) {
  switch (post.type) {
    case PostType.Ad:
      return <PostCardAd post={post} index={index} />;
    case PostType.Article:
    default:
      return <Article post={post} index={index} />;
  }
}
