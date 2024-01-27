import Post from '@domain/post'

import getReadingTime from '@/infrastructure/helper/getReadingTime'

import RenderMarkdown from '../RenderMarkdown'
import Metadata from './parts/Metadata'
import styles from './post-details.module.scss'

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
        <RenderMarkdown content={post.content} className={styles.content} classNameCollection={{
          "micro-post": {
            container: styles.micro__post__content__container,
            picture__container: styles.micro__post__picture__container,
            infos: styles.micro__post__infos,
          }
        }} />
      </article>
    </>
  )
}