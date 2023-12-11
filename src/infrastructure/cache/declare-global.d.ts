import type { RedisClientType } from 'redis';

declare global {
  var cache: any | undefined;
}
export default global;