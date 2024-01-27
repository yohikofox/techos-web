'use client'

import 'dayjs/locale/fr'

import classNames from "classnames"
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import md from 'markdown-it';
import Link from "next/link";
import { MouseEventHandler, useContext } from "react"

import Clock from "@/app/(main)/components/Icon/Clock";
import Logo from "@/app/(main)/components/Icon/Logo";
import { Image } from "@/components/Image"
import getReadingTime from "@/infrastructure/helper/getReadingTime";

import { SearchDataContext } from "../context"
import styles from "./search-results.module.scss"

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
        {searchResults?.hits ? searchResults.hits?.map((it: any, index: number) => {
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
