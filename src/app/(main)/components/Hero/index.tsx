import ImageSet from "@domain/image"
import styles from "./hero.module.scss"
import md from "markdown-it"
import ServerImage from "@/components/Image"

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
          <ServerImage
            fill
            priority
            src={background.src}
            alt={background.name || ''}
            preset={background.preset}
            sizes={background.sizes}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <section className={styles.content}>
        {picture && (
          <div className={styles.picture}>
            <ServerImage
              width={picture.width}
              height={picture.height}
              src={picture.src}
              sizes={picture.sizes}
              preset={picture.preset}
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