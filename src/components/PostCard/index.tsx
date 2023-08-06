import Image from "next/image";
import Post from "@/business/model/post";
import styles from "./postCard.module.scss";
import md from "markdown-it"
import dayjs from "dayjs";
import Link from "next/link";
import Clock from "../Icon/Clock";
import getReadingTime from "@/utils/helper/getReadingTime";

export interface PostCardProps {
  post: Partial<Post>
}

export default function Post({ post }: PostCardProps) {

  const { src } = post?.picture || { src: '', width: 0, height: 0 };

  return (
    <article className={styles.container}>
      <figure className={styles.figure}>
        <Image
          alt={post.title || ''}
          src={`http://localhost:1337${src}`}
          fill
          objectFit={'cover'}
        />
      </figure>

      <section className={styles.details}>
        <h2>{post.title}</h2>
        <section className={styles.metadata}>
          <span>
            <span>écrit par {post.author?.username}, </span>
            <span>le {dayjs(post.start_at).format("dddd Do MMMM YYYY")}</span>
          </span>
          <span className={styles.reading__time}><Clock className={styles.clock} />{getReadingTime(post.content || "")} min de lecture</span>
        </section>
        {post.extract && (
          <p dangerouslySetInnerHTML={{ __html: md().render(post.extract) }} ></p>
        )}
      </section>
      <Link href={`/post/${post.slug}`} className={styles.link} />
    </article >
  )
}