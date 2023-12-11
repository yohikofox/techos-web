import RedisCacheHandler from './redis/redis-cache-handler';
import MemoryCacheHandler from './memory/memory-cache-handler';
import MemcachedCacheHandler from './memcached/memcached-cache-handler';

export enum CacheProvider {
  MEMORY = 'memory',
  MEMCACHED = 'memcached',
  REDIS = 'redis'
}

export default class CacheFactory {
  public static resolve() {
    const cacheProvider = process.env.CACHE_PROVIDER;
    switch (cacheProvider) {
      // case CacheProvider.MEMORY:
      //   return MemoryCacheHandler;
      // case CacheProvider.MEMCACHED:
      //   return MemcachedCacheHandler;
      case CacheProvider.REDIS:
        return RedisCacheHandler;
      default:
        throw new Error(`Cache provider ${cacheProvider} is not supported`);
    }
  }
}