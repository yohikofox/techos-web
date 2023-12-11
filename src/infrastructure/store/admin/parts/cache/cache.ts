import RedisCacheHandler from "R/src/infrastructure/cache/redis/redis-cache-handler";

export type CacheStore = {
  itemIdList: string[],
  items: Record<string, CacheItem>,
  loadCacheItem: ({ id, apiKey }: { id: string, apiKey: string }) => Promise<void>,
  removeCacheItem: ({ id, apiKey }: { id: string, apiKey: string }) => Promise<void>,
  loadCacheItems: ({ apiKey }: { apiKey: string }) => Promise<void>,
}

export type CacheItem = {}

export default class CacheStoreImplementation implements CacheStore {
  public items: Record<string, CacheItem>;
  public itemIdList: string[];

  private set: any;

  constructor(set: any, initialState: Partial<CacheStore> = {}) {
    this.set = set
    this.items = initialState.items === undefined ? {} : initialState.items;
    this.itemIdList = initialState.itemIdList === undefined ? [] : initialState.itemIdList;
  }

  public removeCacheItem: ({ apiKey, id }: { apiKey: string, id: string }) => Promise<void> = async ({ apiKey, id }: { apiKey: string, id: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/tags/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        'api-key': apiKey
      },
      next: {
        revalidate: 0
      }
    })

    const data = await response.json()

    this.loadCacheItems({ apiKey })
  }

  public loadCacheItem: ({ apiKey, id }: { apiKey: string, id: string }) => Promise<void> = async ({ apiKey, id }: { apiKey: string, id: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/tags/${encodeURIComponent(id)}`, {
      headers: {
        'api-key': apiKey
      },
      next: {
        revalidate: 0
      }
    })

    const data = await response.json()

    this.set((state: any) => {
      const ns = { ...state }
      ns.cache.items[id] = data
      return ns
    })
  }

  public loadCacheItems: ({ apiKey }: { apiKey: string }) => Promise<void> = async ({ apiKey }: { apiKey: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/tags`, {
      headers: {
        'api-key': apiKey
      },
      next: {
        revalidate: 0
      }
    })

    const data = await response.json()

    this.set((state: any) => {
      const ns = { ...state }
      ns.cache.itemIdList = data?.items || []
      return ns
    })
  }
}


export const initialState: Partial<CacheStore> = {
  items: {},
  itemIdList: []
}