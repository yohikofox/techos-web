const MAX_AGE = process.env.NODE_ENV === 'development' ? 60 : 60 * 24 * 5;

export default class SessionConstants {
  static readonly MAX_AGE = MAX_AGE;
}