export type CookieValue = {
  value: string
  option: any
}
export type CookieCollection = Record<string, CookieValue>

const defaultOption = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
  maxAge: 60 * 60 * 24 * 30
}
export interface ICookieManager {
  remove(key: string): void
  update(key: string, value: string, options?: any): void
  invalidate(key: string): void
  get(key: string): string | undefined
  add(key: string, value: string, options?: any): void
  render(): string
  filter(keys: string[]): void
}
export default class CookieManager implements ICookieManager {
  private _store: CookieCollection

  constructor(private readonly cookieValue: string) {
    this._store = CookieManager.parse(cookieValue)
  }

  public remove(key: string): void {
    delete this._store[key]
  }

  public update(key: string, value: string, options?: any): void {
    this._store[key] = {
      value: value,
      option: options || defaultOption
    }
  }

  public invalidate(key: string): void {
    this.update(key, '', { maxAge: -1 })
  }

  public get(key: string): string | undefined {
    return this._store[key]?.value
  }

  public filter(keys: string[]): void {
    const newStore: CookieCollection = {}
    keys.forEach(key => {
      if (!this._store[key]) return
      newStore[key] = this._store[key]
    })
    this._store = newStore
  }

  public add(key: string, value: string, options?: any): void {
    this._store[key] = {
      value: value,
      option: options || defaultOption
    }
  }

  public render(): string {
    return Object.keys(this._store).length > 0 ? CookieManager.stringify(this._store) : ''
  }

  public static parse(value: string): CookieCollection {
    const cookies: CookieCollection = {}
    value.split(';').forEach(v => {
      const [key, value] = v.split('=')
      cookies[key.trim()] = {
        value: value,
        option: defaultOption
      }
    })
    return cookies
  }

  public static stringify(cookies: CookieCollection): string {
    return Object.entries(cookies).map(([key, value]) => `${key}=${value.value}`).join('; ')
  }
}