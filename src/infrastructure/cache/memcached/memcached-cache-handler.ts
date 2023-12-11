import Memcached from 'memcached';
import { CustomCacheHandler } from '../CustomCacheHandler';

export default class MemcachedCacheHandler implements CustomCacheHandler {
  private TAG_MANIFESTS_KEY = 'tags-manifest'
  private WAITING_TIME = 500
  private LIMIT_WAITING_TIME = 30_000
  private waitedTime: number = 0;

  static _cache: Memcached | undefined = undefined;

  private static _initialized: boolean = false;

  public static get cache(): Memcached | undefined {
    return globalThis.memcachedClient;
  }
  public static set cache(value: Memcached | undefined) {
    globalThis.memcachedClient = value;
  }

  options: any;
  constructor(options: any) {
    this.options = options
  }

  public list<T>(): T[] | Promise<T[]> {
    return []
  }

  static get initialized(): boolean {
    return MemcachedCacheHandler._initialized;
  }
  static set initialized(value: boolean) {
    MemcachedCacheHandler._initialized = value;
  }

  private async waitForInitialization<T>(label: string, action: Function): Promise<T | undefined> {
    if (MemcachedCacheHandler.initialized) {
      console.time(label)
      const result = action()
      console.timeEnd(label)
      return result;

    } else {
      if (this.waitedTime > this.LIMIT_WAITING_TIME) {
        throw new Error('Redis client not connected')
      }

      this.waitedTime += this.WAITING_TIME
      setTimeout(() => this.waitForInitialization(label, action), this.WAITING_TIME)
    }
  }

  async get(key: string) {
    const strValue = await this.waitForInitialization<string>(`get ${key}`, async () => await new Promise((resolve, reject) => {
      MemcachedCacheHandler.cache?.get(key, (err, data) => {
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
      MemcachedCacheHandler.cache?.set(key, JSON.stringify(data), ctx.revalidate, (err) => {
        if (err) reject(err);
        resolve();
      })
    }));
  }

  async revalidateTag(tag: string): Promise<void> {
    throw new Error('Method not implemented.')

  }
}


export async function loadCacheHandler() {
  if (MemcachedCacheHandler.initialized) return;
  const options: Memcached.options = {}
  const memcachedClient = new Memcached('localhost:11211', options);
  globalThis.memcachedClient = memcachedClient;
  MemcachedCacheHandler.initialized = true;
}