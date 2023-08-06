import Post from "@/business/model/post"
import PostCard from "../PostCard"
import styles from "./post-list.module.scss"

export interface PostListProps {
  posts: Partial<Post>[]
  title: string
}

export default function PostList({ posts, title }: PostListProps) {
  return (
    <section className={styles.container}>
      {/* <h2>{title}</h2> */}
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </section>
  )
}