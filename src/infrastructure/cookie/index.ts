export type CookieValue = {
  value: string
  option: any
}
export type CookieCollection = Record<string, CookieValue>

const secrurePrefix = "__Secure-"

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
  updateKey(key: string, newKey: string): void
}
export default class CookieManager implements ICookieManager {
  private _store: CookieCollection

  constructor(private readonly cookieValue: string) {
    this._store = CookieManager.parse(cookieValue)
  }
  public updateKey(key: string, newKey: string): void {
    const parsedKey = CookieManager.parseKey(key)
    const parsedNewKey = CookieManager.parseKey(newKey)

    this._store[parsedNewKey.key] = this._store[parsedKey.key]
    delete this._store[parsedKey.key]
  }

  public remove(key: string): void {
    const parsedKey = CookieManager.parseKey(key)
    delete this._store[parsedKey.key]
  }

  public update(key: string, value: string, options?: any): void {
    const parsedKey = CookieManager.parseKey(key)

    this._store[parsedKey.key] = {
      value: value,
      option: {
        ...(options || defaultOption),
        secure: parsedKey.isSecure
      }
    }
  }

  public invalidate(key: string): void {
    const parsedKey = CookieManager.parseKey(key)
    this.update(parsedKey.key, '', { maxAge: -1 })
  }


  private static parseKey = (key: string): {
    isSecure: boolean
    key: string
  } => {
    const isSecure = key.startsWith(secrurePrefix)
    return {
      isSecure,
      key: isSecure ? key.replace(secrurePrefix, '') : key
    }
  }

  public get(key: string): string | undefined {
    const parsedKey = CookieManager.parseKey(key)
    return this._store[parsedKey.key]?.value
  }

  public filter(keys: string[]): void {
    const newStore: CookieCollection = {}
    keys.forEach(key => {
      const parsedKey = CookieManager.parseKey(key)

      if (!this._store[parsedKey.key]) return
      newStore[parsedKey.key] = this._store[parsedKey.key]
    })
    this._store = newStore
  }

  public add(key: string, value: string, options?: any): void {
    const parsedKey = CookieManager.parseKey(key)
    this._store[parsedKey.key] = {
      value: value,
      option: {
        ...(options || defaultOption),
        secure: parsedKey.isSecure
      }
    }
  }

  public render(): string {
    return Object.keys(this._store).length > 0 ? CookieManager.stringify(this._store) : ''
  }


  public static parse(value: string): CookieCollection {
    const cookies: CookieCollection = {}
    value.split(';').forEach(v => {
      const [key, value] = v.split('=')
      if (!key) return

      const parsedKey = CookieManager.parseKey(key.trim())
      cookies[parsedKey.key] = {
        value: value,
        option: {
          ...defaultOption,
          secure: parsedKey.isSecure
        }
      }
    })
    return cookies
  }

  public static stringify(cookies: CookieCollection): string {
    return Object.entries(cookies).map(([key, value]) => {
      return `${value.option.isSecure ? `${secrurePrefix}${key}` : key}=${value.value}`
    }).join('; ')
  }



}