import BaseCacheHandler from "../BaseCacheHandler";
import { CacheProvider } from "../CacheFactory";

type MemoryCache = Map<string, unknown>;

export default class MemoryCacheHandler extends BaseCacheHandler {
  constructor() {
    super(CacheProvider.MEMORY);
    this.loadHandler();
  }

  public list<T>(): T[] | Promise<T[]> {
    return [];
  }

  async get<T>(key: string): Promise<T> {
    const result = await this.waitForInitialization<T>(
      `get ${key}`,
      async () => this.cache<MemoryCache>()?.get(key) as T
    );

    if (result === undefined) return undefined as T;

    return result;
  }
  async set(key: string, data: unknown) {
    await this.waitForInitialization(`set ${key}`, async () =>
      this.cache<MemoryCache>()?.set(key, {
        value: data,
        lastModified: Date.now(),
      })
    );
  }

  async remove(key: string): Promise<void> {
    await this.waitForInitialization(`remove ${key}`, async () =>
      this.cache<MemoryCache>()?.delete(key)
    );
  }

  async loadHandler(): Promise<void> {
    if (this.initialized()) return;

    this.setCache(new Map());

    this.setInitialized(true);
  }
}
