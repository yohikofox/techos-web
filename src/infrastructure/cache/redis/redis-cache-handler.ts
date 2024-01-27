import { createClient,RedisClientOptions, RedisClientType, SetOptions } from 'redis';

import BaseCacheHandler from '../BaseCacheHandler';
import { CacheProvider } from '../CacheFactory';

export default class RedisCacheHandler extends BaseCacheHandler {

  constructor(options: any) {
    super(options, CacheProvider.REDIS)
    this.options = options
    this.loadHandler()
  }

  public async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    const options: RedisClientOptions = {
      url: process.env.REDIS_URL,
    }

    const client = createClient(options) as RedisClientType;
    client.on('error', (err: any) => {
      console.error('Caching Error :', err);
    });
    client.on('connect', () => {
      this.setInitialized(true);
      console.log('Redis client connected');
    });

    this.setCache(client);

    this.cache<RedisClientType>()!.connect();
  }

  public async list<T>(): Promise<T[]> {
    try {
      const result = await this.waitForInitialization<T[]>(`list`, async () => await this.cache<RedisClientType>()?.keys('*') as T[])
      return result || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async get(key: string) {
    try {
      const strValue = await this.waitForInitialization<string>(`get ${key}`, async () => this.cache<RedisClientType>()?.get(key));
      if (!strValue) return null;
      return JSON.parse(strValue);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.waitForInitialization<string>(`get ${key}`, async () => this.cache<RedisClientType>()?.del(key));
    } catch (err) {
      console.error(err);
    }
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
    try {
      await this.waitForInitialization<string>(`set ${key}`, async () => await this.cache<RedisClientType>()?.set(key, JSON.stringify(data), options));
    } catch (err) {
      console.error(err);
    }
  }
}