'use client'

/* =========================================================================================================== */
import classNames from "classnames"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "querystring"
import { FacetedValue } from "R/src/domain/search"
/* =========================================================================================================== */
import { useCallback } from "react"

import styles from "./styles.module.scss"

/* =========================================================================================================== */

type FacetItemData = {
  key: string
} & FacetedValue

export interface FacetItemProps {
  data: FacetItemData,
  multiple?: boolean,
  autocomplete?: boolean,
  className?: string,
}

export default function Component({ data, multiple, className }: FacetItemProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = {
    [data.key]: data.label,
  }

  const selectValue = useCallback(async (d: FacetItemData) => {
    const newQuery: Record<string, string | string[]> = {}

    newQuery[d.key] = d.label

    for (const k of searchParams.keys()) {

      if (k === d.key) {
        const alreadyInQuery = searchParams.getAll(k)

        if (alreadyInQuery.includes(d.label)) {
          newQuery[k] = alreadyInQuery.filter((v: string) => v !== d.label)
        } else {
          newQuery[k] = [...alreadyInQuery, d.label]
        }

        continue
      }

      const alreadyInQuery = searchParams.getAll(k)

      if (alreadyInQuery.length > 0) {

        alreadyInQuery.forEach((v: string) => {
          const vals = newQuery[k] || []
          if (vals.includes(v)) return
          newQuery[k] = [...vals, v]
        })

      }
    }

    router.push(`/posts/1?${qs.stringify(newQuery)}`)

  }, [router, searchParams])

  return (
    <>
      <div className={classNames(styles.facet, className)}>
        {data.label} ({data.count})
        <button onClick={(e => {
          e.preventDefault()
          selectValue(data)
        })} aria-label={data.label} className={styles.inset__link} />
      </div>
    </>
  )
}