'use client'

import { Image } from "R/src/components/Image"
import MicroPost from "R/src/business/model/microPost"
import styles from "./styles.module.scss"
import Link from "next/link"
import classNames from "classnames"


export type PostClassNames = {
  container?: string
  infos?: string
  picture__container?: string
  picture__image?: string
}

export interface PostProps {
  post: MicroPost
  className?: PostClassNames
}

export default function Component({ post, className }: PostProps) {
  return (
    <div className={classNames(styles.post, className?.container)}>
      <div className={classNames(styles.infos, className?.infos)}>
        <h2>{post.title}</h2>
      </div>
      <div className={classNames(styles.picture__container, className?.picture__container)}>
        <Image
          src={post.picture?.src || ''}
          alt={post.picture?.name || ''}
          fill
          className={classNames(styles.picture__image, className?.picture__image)}
        />
      </div>
      <Link href={`/tips/${post.slug}`} aria-label={post.title} className={styles.inset__link} />
    </div>
  )
}