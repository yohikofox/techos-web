'use client'

import useAdminStore from "R/src/infrastructure/store/admin"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import CacheItem from "../CacheItem"

export interface TagListProps {
  apiKey: string
}

export default function Component({ apiKey }: TagListProps) {
  const { tags, load } = useAdminStore(useShallow((state) => ({ tags: state.cache.itemIdList, load: state.cache.loadCacheItems })))

  useEffect(() => {
    (async () => {
      await load({ apiKey })
    })()
  }, [load, apiKey])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((it: string, index: number) => <CacheItem key={`item-${index}`} id={it} apiKey={apiKey} />)}
        </tbody>
      </table>
    </>
  )
}