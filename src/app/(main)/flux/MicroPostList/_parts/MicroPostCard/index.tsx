'use client'

import { Image } from "R/src/components/Image"
import MicroPost from "R/src/business/model/microPost"
import styles from "./styles.module.scss"
import Link from "next/link"

export default function Component({ post }: { post: Partial<MicroPost> }) {
  return (
    <div className={styles.post}>
      <div className={styles.infos}>
        <h2>{post.title}</h2>
      </div>
      <div className={styles.picture__container}>
        <Image
          src={post.picture?.src || ''}
          alt={post.picture?.name || ''}
          fill
          className={styles.picture__image}
        />
      </div>
      <Link href={`/tips/${post.slug}`} aria-label={post.title} className={styles.inset__link} />
    </div>
  )
}