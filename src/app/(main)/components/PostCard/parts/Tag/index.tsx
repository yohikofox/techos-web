import { CSSProperties } from "react"
import styles from "./tag.module.scss"
import Tag from "@/business/model/tag"
import Link from "next/link"
import classNames from "classnames"

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
      <Link href={`/tag/${tag.slug}`} aria-label={tag.label} className={styles.inset__link} />
    </div>
  )
}