import CaretRight from "@/app/(main)/components/Icon/CaretRight";
import styles from "./pagination.module.scss"
import CaretLeft from "@/app/(main)/components/Icon/CaretLeft";
import Link from "next/link";
import { Pagination as PaginationProps } from "R/src/business/model/pagination";

const PAGINATION_ITEM_COUNT = 5;

const PaginationItem = ({ page }: { page: number }) => {
  return (
    <div className={styles.item}>
      <span>{page}</span>
      <Link href={`/liste-de-posts/${page}`} aria-label={`page-${page}`} className={styles.inset__link} />
    </div>
  )
}

export default function Pagination({ page, pageCount, pageSize, total }: PaginationProps) {
  if (pageCount <= 1) {
    return null
  }

  let start = 0
  let end = 0
  if (pageCount <= PAGINATION_ITEM_COUNT) {
    start = 1
    end = pageCount
  }
  else if (page >= pageCount - 2) {
    start = pageCount - PAGINATION_ITEM_COUNT
    end = pageCount
  }
  else if (page <= 3) {
    start = 1
    end = PAGINATION_ITEM_COUNT
  }
  else {
    start = page - 2
    end = page + 2
  }

  const items = []

  for (let i = start; i <= end; i++) {
    items.push(i)
  }

  return (
    <>
      <section className={styles.container}>
        {page > 1 && (
          <>
            <div className={styles.item}>
              <CaretLeft className={styles.caret} /><CaretLeft className={styles.caret} />
              <Link aria-label="first page" href={`/liste-de-posts/1`} className={styles.inset__link} />
            </div>
            <div className={styles.item}>
              <CaretLeft className={styles.caret} />
              <Link aria-label="previous page" href={`/liste-de-posts/${page - 1}`} className={styles.inset__link} />
            </div>
          </>
        )}
        {items.map((item, index) => {
          return <PaginationItem key={`pagination-item-${index}`} page={item} />
        })}
        {page < pageCount && (
          <>
            <div className={styles.item}>
              <CaretRight className={styles.caret} />
              <Link aria-label="next page" href={`/liste-de-posts/${page + 1}`} className={styles.inset__link} />
            </div>
            <div className={styles.item}>
              <CaretRight className={styles.caret} /><CaretRight className={styles.caret} />
              <Link aria-label="last page" href={`/liste-de-posts/${pageCount}`} className={styles.inset__link} />
            </div>
          </>
        )}
      </section>
    </>
  )
}