import { RedisClientOptions, RedisClientType, SetOptions, createClient } from 'redis';
import { CustomCacheHandler } from '../CustomCacheHandler';

export default class RedisCacheHandler implements CustomCacheHandler {
  private TAG_MANIFESTS_KEY = 'tags-manifest'
  private WAITING_TIME = 500
  private LIMIT_WAITING_TIME = 30_000
  private waitedTime: number = 0;

  private static _initialized: boolean = false;

  public static get cache(): RedisClientType | undefined {
    return globalThis.redisClient;
  }
  public static set cache(value: RedisClientType | undefined) {
    globalThis.redisClient = value;
  }

  options: any;
  constructor(options: any) {
    this.options = options
  }

  static get initialized(): boolean {
    return RedisCacheHandler._initialized;
  }
  static set initialized(value: boolean) {
    RedisCacheHandler._initialized = value;
  }

  public async list<T>(): Promise<T[]> {
    return RedisCacheHandler.cache?.keys('*') as any;
  }

  private async waitForInitialization<T>(label: string, action: Function): Promise<T | undefined> {
    if (RedisCacheHandler.initialized) {
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
    const strValue = await this.waitForInitialization<string>(`get ${key}`, async () => RedisCacheHandler.cache?.get(key));
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
    const options: SetOptions = {
      EX: ctx.revalidate,
    }
    await this.waitForInitialization<string>(`set ${key}`, async () => await RedisCacheHandler.cache?.set(key, JSON.stringify(data), options));

  }

  async revalidateTag(tag: string): Promise<void> {
    throw new Error('Method not implemented.')

  }
}


export async function loadCacheHandler() {
  if (RedisCacheHandler.initialized) return;

  const options: RedisClientOptions = {
    url: 'redis://localhost:6379',
  }
  RedisCacheHandler.cache = createClient(options) as RedisClientType;
  RedisCacheHandler.cache.on('error', (err: any) => {
    console.error('Caching Error :', err);
  });
  RedisCacheHandler.cache.on('connect', () => {
    RedisCacheHandler.initialized = true;
    console.log('Redis client connected');
  });
  RedisCacheHandler.cache.connect();
}