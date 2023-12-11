
import { CustomCacheHandler } from "../CustomCacheHandler";

type MemoryCache = Map<any, any>

export default class MemoryCacheHandler implements CustomCacheHandler {
  options: any;

  private static _initialized: boolean = false;

  public static get cache(): MemoryCache | undefined {
    return globalThis.memoryCacheClient;
  }
  public static set cache(value: MemoryCache | undefined) {
    globalThis.memoryCacheClient = value;
  }

  static get initialized(): boolean {
    return MemoryCacheHandler._initialized;
  }
  static set initialized(value: boolean) {
    MemoryCacheHandler._initialized = value;
  }

  private TAG_MANIFESTS_KEY = 'tags-manifest'
  private WAITING_TIME = 500
  private LIMIT_WAITING_TIME = 30_000
  private waitedTime: number = 0;

  constructor(options: any) {
    this.options = options;
  }

  public list<T>(): T[] | Promise<T[]> {
    return []
  }


  private async waitForInitialization<T>(label: string, action: Function): Promise<T | undefined> {
    if (MemoryCacheHandler.initialized) {
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
    const result = await this.waitForInitialization<any>(`get ${key}`, async () => MemoryCacheHandler.cache?.get(key));
    return result
  }
  async set(key: string, data: any) {
    await this.waitForInitialization(`set ${key}`, async () => MemoryCacheHandler.cache?.set(key, {
      value: data,
      lastModified: Date.now()
    }));
  }

  revalidateTag(_tag: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
};


export async function loadCacheHandler() {
  if (MemoryCacheHandler.initialized) return;
  globalThis.memoryCacheClient = new Map();
  MemoryCacheHandler.initialized = true;
}