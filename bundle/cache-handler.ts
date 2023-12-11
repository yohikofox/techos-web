import RedisCacheHandler, { loadCacheHandler as loadRedisCacheHandler } from "R/src/infrastructure/cache/redis/redis-cache-handler"
import MemcachedCacheHandler, { loadCacheHandler as loadMemcahedCacheHandler } from "R/src/infrastructure/cache/memcached/memcached-cache-handler"
import MemoryCacheHandler, { loadCacheHandler as loadMemoryCacheHandler } from "R/src/infrastructure/cache/memory/memory-cache-handler"



(async () => {
  await loadRedisCacheHandler();
})()


module.exports = RedisCacheHandler; 