import { CSSProperties } from "react"
import styles from "./tag.module.scss"
import Tag from "@/business/model/tag"
import Link from "next/link"

export interface TagProps {
  tag: Tag
}
export default function Tag({ tag }: TagProps) {
  const style = {
    "--style-background-color": tag.backgroundColor || "#000",
    "--style-foreground-color": tag.color || "#fff",
  }

  return (
    <div className={styles.container} style={style as any}>
      {tag.label}
      <Link href={`/tag/${tag.slug}`} className={styles.inset__link} />
    </div>
  )
}