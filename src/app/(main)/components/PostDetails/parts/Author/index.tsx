import Author from "@domain/author";
import styles from "./author.module.scss"
import classNames from "classnames";
import ServerImage from "@/components/Image"

export interface AuthorProps {
  data: Author
  className?: string
}

export default async function Author({ data, className }: AuthorProps) {
  return (
    <>
      <section className={classNames(styles.container, className)}>
        <section className={styles.avatar__container}>
          <div className={styles.avatar}>
            <ServerImage
              src={data.avatar?.src || ''}
              alt='avatar'
              preset={data.avatar?.preset}
              fill
              sizes={data.avatar?.sizes}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </section>
        <section className={styles.informations}>
          <span className={styles.name}>{data.username}</span>
          <button className={styles.follow}>Suivre</button>
        </section>
      </section>
    </>
  )
}