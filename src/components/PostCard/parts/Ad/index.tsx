import Image from "next/image"
import { PostCardProps } from "../..";
import styles from "./ad.module.scss"

export default async function PostCardAd({ post }: PostCardProps) {
  const { src } = post?.picture || { src: '', width: 0, height: 0 };

  return (
    <div className={styles.container}>
      <figure className={styles.figure}>
        <Image
          alt={post.title || ''}
          src={src || ''}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </figure>
    </div>
  )
}