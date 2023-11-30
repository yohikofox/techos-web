import TrackingWorker from "@/app/(main)/components/TrackingWorker";
import AuthorComponent from "../Author";
import PostDate from "../PostDate";
import styles from "./metadata.module.scss"
import Author from "@/business/model/author";
import classNames from "classnames";

export interface MetadataProps {
  author: Author
  start_at: string
  slug: string
  viewCount?: number
  className?: string
  readingTime?: number
}
export default function Metadata({ author, start_at, slug, viewCount, className, readingTime }: MetadataProps) {
  return (
    <section className={classNames(styles.container, className)}>
      <AuthorComponent className={styles.author} data={author} />
      <section className={styles.article__container}>
        <section className={styles.article}>
          <PostDate className={styles.post__date} date={start_at} />
          <div>
            {`${readingTime} min à lire`}
          </div>
          <TrackingWorker className={styles.metedata__view_count} data={{
            slug: slug,
          }} initialData={{
            viewCount: viewCount || 0
          }} title={"Vues : "} />
        </section>
      </section>
    </section>
  )
}