import ServerImage from "@/components/Image"

import { PostCardProps } from "../..";
import styles from "./ad.module.scss"

export default async function PostCardAd({ post, index }: PostCardProps) {
  const { src, preset } = post?.picture || { src: '', width: 0, height: 0 };

  return (
    <div className={styles.container}>
      <figure className={styles.figure}>
        <ServerImage
          alt={post.title || ''}
          priority={index < 3}
          preset={preset}
          src={src || ''}
          fill
          sizes={post.picture?.sizes}
          style={{
            objectFit: 'cover',
          }}
        />
      </figure>
    </div>
  )
}