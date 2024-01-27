import { Pagination as PaginationProps } from "@domain/pagination";
import Link from "next/link";

import CaretLeft from "@/app/(main)/components/Icon/CaretLeft";
import CaretRight from "@/app/(main)/components/Icon/CaretRight";

import styles from "./pagination.module.scss"

const PAGINATION_ITEM_COUNT = 5;

const PaginationItem = ({ page, pathPrefix }: { page: number, pathPrefix: string }) => {
  return (
    <div className={styles.item}>
      <span>{page}</span>
      <Link href={`/${pathPrefix}/${page}`} aria-label={`page-${page}`} className={styles.inset__link} />
    </div>
  )
}

export default function Pagination({ page, pageCount, pathPrefix, pageSize, total }: PaginationProps) {
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
              <Link aria-label="first page" href={`/${pathPrefix}/1`} className={styles.inset__link} />
            </div>
            <div className={styles.item}>
              <CaretLeft className={styles.caret} />
              <Link aria-label="previous page" href={`/${pathPrefix}/${page - 1}`} className={styles.inset__link} />
            </div>
          </>
        )}
        {items.map((item, index) => {
          return <PaginationItem key={`pagination-item-${index}`} page={item} pathPrefix={pathPrefix} />
        })}
        {page < pageCount && (
          <>
            <div className={styles.item}>
              <CaretRight className={styles.caret} />
              <Link aria-label="next page" href={`/${pathPrefix}/${page + 1}`} className={styles.inset__link} />
            </div>
            <div className={styles.item}>
              <CaretRight className={styles.caret} /><CaretRight className={styles.caret} />
              <Link aria-label="last page" href={`/${pathPrefix}/${pageCount}`} className={styles.inset__link} />
            </div>
          </>
        )}
      </section>
    </>
  )
}