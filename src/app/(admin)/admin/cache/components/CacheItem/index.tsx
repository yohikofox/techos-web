"use client";

import useAdminStore from "R/src/infrastructure/store/admin";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export interface CacheItemProps {
  id: string;
  apiKey: string;
}
export default function Component({ id, apiKey }: CacheItemProps) {
  const { item, loadItem, removeItem } = useAdminStore(
    useShallow((state) => ({
      item: state.cache.items[id],
      loadItem: state.cache.loadCacheItem,
      removeItem: state.cache.removeCacheItem,
    }))
  );

  useEffect(() => {
    if (item === null)
      (async () => {
        await loadItem({ id, apiKey });
      })();
  }, [loadItem, id, apiKey, item]);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>
          <button onClick={async () => await removeItem({ id, apiKey })}>
            Refresh
          </button>
        </td>
      </tr>
    </>
  );
}
