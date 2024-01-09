'use client'

import { MouseEventHandler, Suspense, useContext } from "react"
import styles from "./search-results.module.scss"
import { SearchDataContext } from "../context"
import { Image } from "@/components/Image"
import md from 'markdown-it';
import getReadingTime from "@/infrastructure/helper/getReadingTime";

import dayjs from "dayjs";
import 'dayjs/locale/fr'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Clock from "@/app/(main)/components/Icon/Clock";
import Link from "next/link";
import Logo from "@/app/(main)/components/Icon/Logo";
import classNames from "classnames"

dayjs.locale('fr')
dayjs.extend(advancedFormat)

const Loading = async () => {
  return (
    <section className={styles.empty__data}>
      <Logo className={styles.logo} />
      <h2 className={styles.no__result}>Chargement ...</h2>
    </section>
  )
}

export interface SearchResultsProps {
  handleSelectedItem: any
}

export default function SearchResults({ handleSelectedItem }: SearchResultsProps) {
  const [searchResults] = useContext(SearchDataContext) || []

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    handleSelectedItem()
  }

  return (
    <>
      <section className={styles.item__list}>
        {searchResults?.hits ? searchResults.hits?.map((it, index) => {
          const readingTime = getReadingTime(it.content);
          return (
            <section key={`search-result-item-${index}`} className={styles.container}>
              <div className={styles.image}>
                <Image
                  src={it.picture.src}
                  alt={it.picture.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.content__title}>{it.title}</h2>
                <div className={styles.meta}>
                  <span>
                    <span>écrit par {it.author?.username}, </span>
                    <span>le {dayjs(it.start_at).format("dddd Do MMMM YYYY")}</span>
                  </span>
                  <span className={styles.reading__time}><Clock className={styles.clock} />{readingTime} min<span className={styles.desktop}>&nbsp;de lecture</span></span>
                </div>
                {it.extract && <div className={classNames(styles.content__extract, styles.tablet)} dangerouslySetInnerHTML={{ __html: md().render(it.extract) }} />}
              </div>
              <Link href={`/post/${it.slug}`} legacyBehavior >
                <a className={styles.inset__link} onClick={handleLinkClick} />
              </Link>
            </section>
          )
        }) :
          (<section className={styles.empty__data}>
            <Logo className={styles.logo} />
            <h2 className={styles.no__result}>Aucun résultat</h2>
          </section>)
        }
      </section>
    </>
  )
}
