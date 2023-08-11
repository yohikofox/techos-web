import { MouseEventHandler, Suspense, useContext } from "react"
import styles from "./search-results.module.scss"
import { SearchDataContext } from "../context"
import Image from "next/image"
import md from 'markdown-it';
import getReadingTime from "@/utils/helper/getReadingTime";

import dayjs from "dayjs";
import 'dayjs/locale/fr'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Clock from "@/components/Icon/Clock";
import Link from "next/link";
import Logo from "@/components/Icon/Logo";

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
    console.log('click')
    handleSelectedItem()
  }

  return (
    <>
      {searchResults?.hits ? searchResults.hits?.map((it, index) => {

        const readingTime = getReadingTime(it.content);

        return (
          <section key={`search-result-item-${index}`} className={styles.container}>
            <div className={styles.image}>
              <Image
                src={`http://localhost:1337${it.picture.src}`}
                alt={it.picture.name}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className={styles.content}>
              <h2>{it.title}</h2>
              <div className={styles.meta}>
                <span>
                  <span>écrit par {it.author?.username}, </span>
                  <span>le {dayjs(it.start_at).format("dddd Do MMMM YYYY")}</span>
                </span>
                <span className={styles.reading__time}><Clock className={styles.clock} />{readingTime} min de lecture</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: md().render(it.extract) }} />
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
    </>
  )
}