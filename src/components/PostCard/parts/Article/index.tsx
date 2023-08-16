import Image from "next/image"
import { PostCardProps } from "../.."
import styles from "./article.module.scss"
import getReadingTime from "@/utils/helper/getReadingTime"
import md from "markdown-it"
import dayjs from "dayjs"
import Link from "next/link"
import Clock from "@/components/Icon/Clock"
import Tag from "../Tag"
import { DisplayTracking } from "@/components/TrackingWorker"
import classNames from 'classnames';
import PostHelper from "@/utils/helper/postHelper"
import Container from "@/business/dependencyFactory"
import { IConfigManager } from "@/business/infrastructure/adapter/configManager"

export default async function Article({ post }: PostCardProps) {
  const configManager = await Container.Instance.resolve<IConfigManager>("Helper/ConfigManager")

  const { src } = post?.picture || { src: '', width: 0, height: 0 };

  const getAbstractHTML = () => {
    const result = post.extract ? md().render(post.extract) : ''
    return PostHelper.getExtract(result);
  }

  return (
    <article className={styles.container}>
      <figure className={styles.figure}>
        <Image
          alt={post.title || ''}
          src={src || ''}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </figure>

      <section className={styles.details}>
        <section className={styles.details__top}>
          <h2 className={styles.title}>{post.title}</h2>
          <span className={styles.metadata__author}>{`De ${post.author?.username}, le ${dayjs(post.start_at).format("DD/MM/YYYY")}`}</span>
          <span className={styles.reading__time}>
            <DisplayTracking className={styles.metadata__count} counter={post.stats?.viewCount || 0} title="Vues : " />
            <span className={styles.reading__effective_time}><Clock className={styles.clock} /><span className={styles.reading__time_label}>{`${getReadingTime(post.content || "")}'`}</span></span>
          </span>
          <div className={styles.metadata__tags}>
            {post.level && <div className={classNames(styles.metadata__level, styles.metadata__tags__item)}>{post.level}</div>}
            {post.tags?.map((tag, index) => <Tag key={index} tag={tag} className={styles.metadata__tags__item} />)}
          </div>
        </section>
        <section className={styles.details__bottom}>
          {post.extract && (
            <div className={styles.abstract} dangerouslySetInnerHTML={{ __html: getAbstractHTML() || '' }} />
          )}
        </section>
      </section>
      <Link href={`/post/${post.slug}`} aria-label={post.title} className={styles.inset__link} />
    </article>
  )
}