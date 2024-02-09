import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  SetOptions,
} from "redis";

import BaseCacheHandler from "../BaseCacheHandler";
import { CacheProvider } from "../CacheFactory";

export default class RedisCacheHandler extends BaseCacheHandler {
  constructor() {
    super(CacheProvider.REDIS);
    this.loadHandler();
  }

  public async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    const options: RedisClientOptions = {
      url: process.env.REDIS_URL,
    };

    const client = createClient(options) as RedisClientType;
    client.on("error", (err: unknown) => {
      console.error("Caching Error :", err);
    });
    client.on("connect", () => {
      this.setInitialized(true);
      console.info("Redis client connected");
    });

    this.setCache(client);

    this.cache<RedisClientType>()!.connect();
  }

  public async list<T>(): Promise<T[]> {
    try {
      const result = await this.waitForInitialization<T[]>(`list`, async <
        T,
      >() => {
        const client = await this.cache<RedisClientType>();
        if (client === undefined) return undefined as T;
        const keys = (await client.keys("*")).map((it) => it);
        return keys as T;
      });
      return result || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async get<T>(key: string): Promise<T> {
    try {
      const strValue = await this.waitForInitialization<string>(
        `get ${key}`,
        async (): Promise<string> => {
          const client = this.cache<RedisClientType>();
          if (client === undefined) return "";
          return (await client.get(key)) as string;
        }
      );
      if (strValue === undefined) return undefined as T;
      return JSON.parse(strValue);
    } catch (err) {
      console.error(err);
      return undefined as T;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.waitForInitialization<void>(`get ${key}`, async () => {
        this.cache<RedisClientType>()?.del(key);
      });
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
  async set(key: string, data: unknown, ctx: { revalidate: number }) {
    const options: SetOptions = {
      EX: ctx.revalidate,
    };
    try {
      await this.waitForInitialization<void>(`set ${key}`, async () => {
        await this.cache<RedisClientType>()?.set(
          key,
          JSON.stringify(data),
          options
        );
      });
    } catch (err) {
      console.error(err);
    }
  }
}
