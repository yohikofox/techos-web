import { CacheHandler } from "next/dist/server/lib/incremental-cache";

export interface CustomCacheHandler extends CacheHandler {
  list: <T>() => T[] | Promise<T[]>;
  loadHandler: () => Promise<void>;
  remove(key: string): Promise<void>;
}
