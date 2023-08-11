import Author from "@/business/model/author";
import styles from "./author.module.scss"
import classNames from "classnames";
import Image from "next/image";

export interface AuthorProps {
  data: Author
  className?: string
}

export default function Author({ data, className }: AuthorProps) {
  let avatarSrc = `http://localhost:1337${data.avatar?.src}`//'https://i.pravatar.cc/400'
  if (!avatarSrc) avatarSrc = `https://eu.ui-avatars.com/api/?background=random&color=random&name=${encodeURIComponent(data.username)}&size=400`

  return (
    <>
      <section className={classNames(styles.container, className)}>
        <section className={styles.avatar__container}>
          <div className={styles.avatar}>
            <Image
              src={avatarSrc}
              alt='avatar'
              fill
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