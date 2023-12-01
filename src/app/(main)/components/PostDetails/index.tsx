import Post from '@/business/model/post'
import styles from './post-details.module.scss'
import Metadata from './parts/Metadata'
import getReadingTime from '@/infrastructure/helper/getReadingTime'
import RenderMarkdown from '../RenderMarkdown'

export interface PostDetailsProps {
  post: Post
}

export default async function PostDetails({ post }: PostDetailsProps) {

  const readingTime = getReadingTime(post.content)
  return (
    <>
      <article className={styles.container}>
        <Metadata
          author={post.author}
          slug={post.slug}
          start_at={post.start_at}
          readingTime={readingTime} />
        <RenderMarkdown content={post.content} className={styles.content} />
      </article>
    </>
  )
}