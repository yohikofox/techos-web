'use client'

import useAdminStore from "R/src/infrastructure/store/admin"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export interface CacheItemProps {
  id: string
  apiKey: string
}
export default function Component({ id, apiKey }: CacheItemProps) {
  const { item, loadItem } = useAdminStore(useShallow((state) => ({ item: state.cache.items[id], loadItem: state.cache.loadCacheItem })))

  useEffect(() => {
    if (!item)
      (async () => {
        await loadItem({ id, apiKey })
      })()
  }, [loadItem, id, apiKey, item])

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>
        </td>
      </tr>
    </>
  )
}