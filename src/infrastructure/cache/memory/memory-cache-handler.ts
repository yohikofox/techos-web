
import BaseCacheHandler from "../BaseCacheHandler";
import { CacheProvider } from "../CacheFactory";

type MemoryCache = Map<any, any>

export default class MemoryCacheHandler extends BaseCacheHandler {
  options: any;

  constructor(options: any) {
    super(options, CacheProvider.MEMORY)
    this.options = options;
    this.loadHandler()
  }

  public list<T>(): T[] | Promise<T[]> {
    return []
  }


  async get(key: string) {
    const result = await this.waitForInitialization<any>(`get ${key}`, async () => this.cache<MemoryCache>()?.get(key));
    return result
  }
  async set(key: string, data: any) {
    await this.waitForInitialization(`set ${key}`, async () => this.cache<MemoryCache>()?.set(key, {
      value: data,
      lastModified: Date.now()
    }));
  }

  async remove(key: string): Promise<void> {
    await this.waitForInitialization(`remove ${key}`, async () => this.cache<MemoryCache>()?.delete(key));
  }

  async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    this.setCache(new Map());

    this.setInitialized(true);
  }
};