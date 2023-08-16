import Image from "next/image"
import ImageSet from "@/business/model/image"
import styles from "./hero.module.scss"
import md from "markdown-it"

export interface HeroProps {
  title?: string
  background?: ImageSet
  picture?: ImageSet
  content?: string
}

export default async function Hero({ title, background, picture, content }: HeroProps) {
  return (
    <section className={styles.container}>
      {background && (
        <div className={styles.background}>
          <Image
            fill
            priority
            src={background.src}
            alt={background.name || ''}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <section className={styles.content}>
        {picture && (
          <div className={styles.picture}>
            <Image
              width={picture.width}
              height={picture.height}
              src={picture.src}
              alt={picture.name || ''}
              style={{
                width: 'auto',
                aspectRatio: `1/1`,
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        <div className={styles.content__text}>
          <h1>{title}</h1>
          {content && <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />}
        </div>
      </section>
    </section>
  )
}