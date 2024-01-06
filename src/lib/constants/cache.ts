const isDebugMode = process.env.DEBUG_MODE === 'true';

export default class CacheConstants {
  static readonly ONE_DAY = isDebugMode ? 0 : 60 * 60 * 24;
  static readonly ONE_HOUR = isDebugMode ? 0 : 60 * 60 * 1;
  static readonly ONE_MINUTE = isDebugMode ? 0 : 60 * 1;
}