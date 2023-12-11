import Memcached from 'memcached';

declare global {
  var memcachedClient: Memcached | undefined;
}
export default global;