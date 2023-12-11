import type { RedisClientType } from 'redis';

declare global {
  var redisClient: RedisClientType | undefined;
}
export default global;