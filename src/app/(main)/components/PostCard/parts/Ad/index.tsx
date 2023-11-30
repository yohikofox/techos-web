import Image from "@/components/Image"
import { PostCardProps } from "../..";
import styles from "./ad.module.scss"

export default async function PostCardAd({ post, index }: PostCardProps) {
  const { src } = post?.picture || { src: '', width: 0, height: 0 };

  return (
    <div className={styles.container}>
      <figure className={styles.figure}>
        <Image
          alt={post.title || ''}
          priority={index < 3}
          src={src || ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </figure>
    </div>
  )
}