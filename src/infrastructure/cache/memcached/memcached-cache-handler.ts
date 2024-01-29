import Memcached from "memcached";

import BaseCacheHandler from "../BaseCacheHandler";
import { CacheProvider } from "../CacheFactory";

export default class MemcachedCacheHandler extends BaseCacheHandler {
  private ALL_KEYS = "all_keys";

  constructor() {
    super(CacheProvider.MEMCACHED);
    this.loadHandler();
  }

  async get<T>(key: string): Promise<T> {
    const strValue = await this.waitForInitialization<T>(
      `get ${key}`,
      async () => {
        new Promise((resolve, reject) => {
          this.cache<Memcached>()?.get(key, (err: unknown, data: T) => {
            if (err !== undefined) reject(err);
            resolve(data);
          });
        });

        return undefined as T;
      }
    );

    if (strValue === undefined) return undefined as T;

    return strValue as T;
  }

  /**{
    fetchCache: true,
    revalidate: 3600,
    fetchUrl: 'http://127.0.0.1:1337/graphql',
    fetchIdx: 4,
    tags: [ 'post' ]
  } */
  async set(key: string, data: never, ctx: { revalidate: number }) {
    await this.waitForInitialization<void>(
      `set ${key}`,
      async () =>
        await new Promise<void>((resolve, reject) => {
          this.cache<Memcached>()?.set(
            key,
            JSON.stringify(data),
            ctx.revalidate,
            (err) => {
              if (err !== undefined) reject(err);
              this.cache<Memcached>()?.get(
                this.ALL_KEYS,
                (err, existingData: unknown) => {
                  if (err !== undefined) reject(err);
                  const newData =
                    existingData !== undefined ? [...data, key] : [key];
                  this.cache<Memcached>()?.set(
                    this.ALL_KEYS,
                    newData,
                    0,
                    (err) => {
                      if (err !== undefined) reject(err);
                      resolve();
                    }
                  );
                }
              );
            }
          );
        })
    );
  }

  async remove(key: string): Promise<void> {
    await this.waitForInitialization<void>(
      `remove ${key}`,
      async () =>
        await new Promise<void>((resolve, reject) => {
          this.cache<Memcached>()?.del(key, (err) => {
            if (err !== undefined) reject(err);
            this.cache<Memcached>()?.get(
              this.ALL_KEYS,
              (err, data: never[]) => {
                if (err !== undefined) reject(err);

                const newData =
                  data !== undefined
                    ? data.filter((k: string) => k !== key)
                    : [];
                this.cache<Memcached>()?.set(
                  this.ALL_KEYS,
                  newData,
                  0,
                  (err) => {
                    if (err !== undefined) reject(err);
                    resolve();
                  }
                );
              }
            );
          });
        })
    );
  }

  async list<T>(): Promise<T[]> {
    return await new Promise<T[]>((resolve, reject) => {
      this.cache<Memcached>()?.get(this.ALL_KEYS, (err, data) => {
        if (err !== undefined) reject(err);
        resolve(data);
      });
    });
  }

  async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    const options: Memcached.options = {};
    const memcachedClient = new Memcached("localhost:11211", options);
    this.setCache<Memcached>(memcachedClient);
    this.setInitialized(true);
  }
}
