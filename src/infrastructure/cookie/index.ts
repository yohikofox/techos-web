export type CookieValue = {
  value: string
  option: {
    path: string
    httpOnly: boolean
    sameSite: string
    secure: boolean
    maxAge: number
    isHost?: boolean
  }
}
export type CookieCollection = Record<string, CookieValue>

const SECURE_PREFIX = "__Secure-"
const HOST_PREFIX = "__Host-"

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
    this.updateCookieOptions(parsedNewKey.key, { secure: parsedNewKey.isSecure, isHost: parsedNewKey.isHost })
    delete this._store[parsedKey.key]
  }

  public remove(key: string): void {
    delete this._store[CookieManager.parseKey(key).key]
  }

  public update(key: string, value: string, options?: any): void {
    const parsedKey = CookieManager.parseKey(key)
    this._store[parsedKey.key].value = value
    this.updateCookieOptions(parsedKey.key, { ...options, secure: parsedKey.isSecure, isHost: parsedKey.isHost })
  }

  public invalidate(key: string): void {
    const parsedKey = CookieManager.parseKey(key)
    this.update(parsedKey.key, '', { maxAge: -1 })
  }

  private updateCookieOptions(key: string, options: any) {
    const parsedKey = CookieManager.parseKey(key)
    const cookie = this._store[parsedKey.key]
    this._store[parsedKey.key] = {
      value: cookie.value,
      option: {
        ...cookie.option,
        ...options,
      }
    }
  }

  private static parseKey = (key: string): {
    isSecure: boolean
    isHost: boolean
    key: string
  } => {
    const isSecure = key.startsWith(SECURE_PREFIX)
    const isHost = key.startsWith(HOST_PREFIX)

    return {
      isSecure,
      isHost,
      key: key.replace(SECURE_PREFIX, '').replace(HOST_PREFIX, '')
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
          secure: parsedKey.isSecure,
          isHost: parsedKey.isHost
        }
      }
    })
    return cookies
  }

  public static stringify(cookies: CookieCollection): string {
    return Object.entries(cookies).map(([key, value]) => {
      if (value.option.secure)
        return `${SECURE_PREFIX}${key}=${value.value}`
      if (value.option.isHost)
        return `${HOST_PREFIX}${key}=${value.value}`
      return `${key}=${value.value}`
    }).join('; ')
  }
}