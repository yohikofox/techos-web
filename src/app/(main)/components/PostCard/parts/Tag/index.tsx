import Tag from "@domain/tag"
import classNames from "classnames"
import Link from "next/link"

import styles from "./tag.module.scss"

export interface TagProps {
  tag: Tag
  className?: string
}
export default function Tag({ tag, className }: TagProps) {
  const style = {
    "--style-background-color": tag.backgroundColor || "#000",
    "--style-foreground-color": tag.color || "#fff",
  }

  return (
    <div className={classNames(styles.container, className)} style={style as any}>
      {tag.label}
      <Link href={`/tag/${tag.slug}`} aria-label={tag.hero?.title} className={styles.inset__link} />
    </div>
  )
}