import Post, { PostType } from "@/business/model/post";
import Article from "./parts/Article";
import PostCardAd from "./parts/Ad";

export interface PostCardProps {
  post: Partial<Post>
}

export default function Post({ post }: PostCardProps) {
  switch (post.type) {
    case PostType.Ad:
      return <PostCardAd post={post} />
    case PostType.Article:
    default:
      return <Article post={post} />
  }
}