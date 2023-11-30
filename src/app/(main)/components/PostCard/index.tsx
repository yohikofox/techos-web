import Post, { PostType } from "@/business/model/post";
import Article from "./parts/Article";
import PostCardAd from "./parts/Ad";

export interface PostCardProps {
  post: Partial<Post>
  index: number
}

export default function Post({ post, index }: PostCardProps) {
  switch (post.type) {
    case PostType.Ad:
      return <PostCardAd post={post} index={index} />
    case PostType.Article:
    default:
      return <Article post={post} index={index} />
  }
}