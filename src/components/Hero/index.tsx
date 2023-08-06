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

export default function Hero({ title, background, picture, content }: HeroProps) {
  return (
    <section className={styles.container}>
      {background && (
        <div className={styles.background}>
          <Image
            fill
            objectFit={'cover'}
            src={`http://localhost:1337${background.src}`}
            alt={background.name || ''}
          />
        </div>
      )}


      <section className={styles.content}>
        {picture && (
          <div className={styles.picture}>
            <Image
              width={picture.width}
              height={picture.height}
              src={`http://localhost:1337${picture.src}`}
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
          {content && <p dangerouslySetInnerHTML={{ __html: md().render(content) }}></p>}
        </div>
      </section>
    </section>
  )
}