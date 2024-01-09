import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

export interface IConfigManager {
  get(key: string, fallback?: string): Promise<string | undefined>
  reload(key?: string): Promise<string | undefined>
  reloadAll(): Promise<void>
}

const RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export default class ConfigManager implements IConfigManager {
  private apiToken: string | undefined;
  private endpoint: string
  private loaded = false;
  private _config: { [key: string]: string } = {}
  private base_url: string;

  constructor() {
    if (!process.env.CMS_ENDPOINT) throw new Error('CMS_ENDPOINT not found')
    this.endpoint = process.env.CMS_ENDPOINT
    this.apiToken = process.env.CMS_API_KEY
    this.base_url = `${this.endpoint}/api/configurations`

    this.load()
  }

  async reload(key?: string | undefined): Promise<string | undefined> {
    const url = `${this.base_url}?filters[key]=${key}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`
      },
      next: {
        revalidate: CacheConstants.ONE_DAY,
        tags: [RevalidateTagConstants.CONFIG]
      }
    })

    if (response.ok) {
      const json = await response.json()
      const conf = json.data[0]
      this._config[conf.attributes.key] = conf.attributes.value
      return conf.attributes.value
    }
  }
  async reloadAll(): Promise<void> {
    this.loaded = false
    this.load()
  }

  private load() {
    if (this.loaded) return

    fetch(this.base_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`
      },
      next: {
        revalidate: CacheConstants.ONE_DAY,
        tags: [RevalidateTagConstants.CONFIG]
      }
    }).then(async (response) => {
      if (!response.ok) throw new Error('ConfigManager error - ' + response.statusText);

      return response.json().then((json) => {
        this._config = {}
        console.log("🚀 ~ file: index.ts:87 ~ ConfigManager ~ returnresponse.json ~ json:", json)

        if (json.data?.length > 0) throw new Error('ConfigManager error - Missing Configurations');

        json.data.forEach((conf: any) => {
          this._config[conf.attributes.key] = conf.attributes.value
        });

        Object.entries(process.env).forEach(([key, value], index) => {
          this._config[key] = value || ''
        })

        this.loaded = true
      })
    }).catch((error) => {
      console.error('ConfigManager error', error)
      throw new Error('ConfigManager error - ' + error.message)
    })
  }

  async get(key: string, fallback?: string): Promise<string | undefined> {
    if (!this.loaded) {
      let tries = 0;

      do {
        tries++
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      } while (tries < RETRY_COUNT)
    }

    const result = this._config[key]
    return result || fallback
  }
}