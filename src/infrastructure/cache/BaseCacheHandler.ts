import { CacheProvider } from "./CacheFactory";
import { CustomCacheHandler } from "./CustomCacheHandler";

export type CacheHandlerOptions = {
  provider: CacheProvider;
};

export default abstract class BaseCacheHandler implements CustomCacheHandler {
  protected TAG_MANIFESTS_KEY = "tags-manifest";
  protected WAITING_TIME = 500;
  protected LIMIT_WAITING_TIME = 30_000;
  protected waitedTime: number = 0;

  constructor(protected provider: CacheProvider) {
    globalThis.cache = globalThis.cache !== undefined ? globalThis.cache : {};
  }

  abstract list<T>(): T[] | Promise<T[]>;
  abstract get<T>(key: string): Promise<T>;
  abstract set(key: string, data: unknown, ctx: unknown): Promise<void>;
  abstract loadHandler(): Promise<void>;
  abstract remove(key: string): Promise<void>;

  private get isDebug() {
    return process.env.DEBUG_MODE === "true";
  }

  public cache<TCache>(): TCache | undefined {
    return globalThis.cache!.client as TCache | undefined;
  }
  public setCache<TCache>(value: TCache | undefined) {
    globalThis.cache!.client = value;
  }

  protected initialized(): boolean {
    return globalThis.cache!._initialized ?? false;
  }
  protected setInitialized(value: boolean) {
    globalThis.cache!._initialized = value;
  }

  protected async waitForInitialization<T>(
    label: string,
    action: () => Promise<T>
  ): Promise<T | undefined> {
    if (this.initialized()) {
      this.isDebug && console.time(label);
      const result = action();
      this.isDebug && console.timeEnd(label);
      return result;
    } else {
      if (this.waitedTime > this.LIMIT_WAITING_TIME) {
        throw new Error("Redis client not connected");
      }

      this.waitedTime += this.WAITING_TIME;
      setTimeout(
        () => this.waitForInitialization(label, action),
        this.WAITING_TIME
      );
    }
  }

  public async revalidateTag(tag: string): Promise<void> {
    console.debug("🚀 ~ BaseCacheHandler ~ revalidateTag ~ tag:", tag);
    throw new Error("Method not implemented.");
  }
}
