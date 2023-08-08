import Image from "next/image"
import { PostCardProps } from "../.."
import styles from "./article.module.scss"
import getReadingTime from "@/utils/helper/getReadingTime"
import md from "markdown-it"
import dayjs from "dayjs";
import Link from "next/link";
import Clock from "@/components/Icon/Clock";
import Tag from "../Tag"

export default function Article({ post }: PostCardProps) {

  const { src } = post?.picture || { src: '', width: 0, height: 0 };

  return (
    <article className={styles.container}>
      <figure className={styles.figure}>
        <Image
          alt={post.title || ''}
          src={`http://localhost:1337${src}`}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </figure>

      <section className={styles.details}>
        <h2>{post.title}</h2>
        <section className={styles.metadata}>
          <div className={styles.metadata__edito}>
            <div>
              <span>écrit par {post.author?.username}, </span>
              <span>le {dayjs(post.start_at).format("dddd Do MMMM YYYY")}</span>
            </div>
            <span className={styles.reading__time}><Clock className={styles.clock} />{getReadingTime(post.content || "")} min de lecture</span>
          </div>
          <div className={styles.metadata__tags}>
            {post.tags?.map((tag, index) => <Tag key={index} tag={tag} />)}
          </div>
        </section>
        {post.extract && (
          <div className={styles.abstract} dangerouslySetInnerHTML={{ __html: md().render(post.extract) }} />
        )}
      </section>
      <Link href={`/post/${post.slug}`} className={styles.inset__link} />
    </article >
  )
}