import classNames from 'classnames';
import dayjs from "dayjs"
import md from "markdown-it"
import Link from "next/link"

import Clock from "@/app/(main)/components/Icon/Clock"
import { DisplayTracking } from "@/app/(main)/components/TrackingWorker"
import ServerImage from "@/components/Image"
import getReadingTime from "@/infrastructure/helper/getReadingTime"
import PostHelper from "@/infrastructure/helper/postHelper"

import TextToSpeechButton from "../../../TextToSpeechButton"
import { PostCardProps } from "../.."
import Tag from "../Tag"
import styles from "./article.module.scss"

export default async function Article({ post }: PostCardProps) {
  const { src, preset } = post?.picture || { src: '', width: 0, height: 0 };

  const getAbstractHTML = () => {
    const result = post.extract ? md().render(post.extract) : ''
    return PostHelper.getExtract(result);
  }

  return (
    <article className={styles.container}>
      <figure className={styles.figure}>
        <ServerImage
          alt={post.title || ''}
          src={src || ''}
          fill
          preset={preset}
          sizes={post.picture?.sizes}
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
          {(post.slug && post.extract) && (
            <div className={styles.read__container}>
              <TextToSpeechButton
                identifier={post.slug}
                className={styles.read__button}
                text={post.extract}
              />
            </div>
          )}
        </section>
      </section>
      <Link href={`/post/${post.slug}`} aria-label={post.title} className={styles.inset__link} />
    </article>
  )
}