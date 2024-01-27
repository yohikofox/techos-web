import Memcached from 'memcached';

import BaseCacheHandler from '../BaseCacheHandler';
import { CacheProvider } from '../CacheFactory';

export default class MemcachedCacheHandler extends BaseCacheHandler {
  private ALL_KEYS = 'all_keys';

  constructor(options: any) {
    super(options, CacheProvider.MEMCACHED)
    this.options = options
    this.loadHandler()
  }

  async get(key: string) {
    const strValue = await this.waitForInitialization<string>(`get ${key}`, async () => await new Promise((resolve, reject) => {
      this.cache<Memcached>()?.get(key, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    }));
    if (!strValue) return null;
    return JSON.parse(strValue);
  }

  /**{
    fetchCache: true,
    revalidate: 3600,
    fetchUrl: 'http://127.0.0.1:1337/graphql',
    fetchIdx: 4,
    tags: [ 'post' ]
  } */
  async set(key: string, data: any, ctx: any) {
    await this.waitForInitialization<string>(`set ${key}`, async () => await new Promise<void>((resolve, reject) => {
      this.cache<Memcached>()?.set(key, JSON.stringify(data), ctx.revalidate, (err) => {
        if (err) reject(err);
        this.cache<Memcached>()?.get(this.ALL_KEYS, (err, data) => {
          if (err) reject(err);
          const newData = data ? [...data, key] : [key];
          this.cache<Memcached>()?.set(this.ALL_KEYS, newData, 0, (err, result) => {
            if (err) reject(err);
            resolve();
          });
        });
      })
    }));
  }

  async remove(key: string): Promise<void> {
    await this.waitForInitialization<string>(`remove ${key}`, async () => await new Promise<void>((resolve, reject) => {
      this.cache<Memcached>()?.del(key, (err) => {
        if (err) reject(err);
        this.cache<Memcached>()?.get(this.ALL_KEYS, (err, data) => {
          if (err) reject(err);

          const newData = data ? data.filter((k: string) => k !== key) : [];
          this.cache<Memcached>()?.set(this.ALL_KEYS, newData, 0, (err, result) => {
            if (err) reject(err);
            resolve();
          });

        });
      })
    }));
  }

  async list<T>(): Promise<T[]> {
    return await new Promise<T[]>((resolve, reject) => {
      this.cache<Memcached>()?.get(this.ALL_KEYS, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    })
  }

  async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    const options: Memcached.options = {}
    const memcachedClient = new Memcached('localhost:11211', options);
    this.setCache<Memcached>(memcachedClient);
    this.setInitialized(true);
  }
}

