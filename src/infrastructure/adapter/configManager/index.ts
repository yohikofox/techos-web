export interface IConfigManager {
  get(key: string, fallback?: string): Promise<string | undefined>
  reload(key?: string): Promise<string | undefined>
  reloadAll(): Promise<void>
}

const RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export default class ConfigManager implements IConfigManager {
  private endpoint: string
  private loaded = false;
  private _config: { [key: string]: string } = {}

  constructor() {
    if (!process.env.CMS_ENDPOINT) throw new Error('CMS_ENDPOINT not found')
    this.endpoint = process.env.CMS_ENDPOINT
    this.load()
  }

  async reload(key?: string | undefined): Promise<string | undefined> {
    const url = `${this.endpoint}/api/configurations?filters[key]=${key}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_API_KEY}`
      },
      next: {
        revalidate: 0
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
    console.log('this.endpoint:', this.endpoint)
    fetch(`${this.endpoint}/api/configurations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CMS_API_KEY}`
      },
      next: {
        revalidate: 0
      }
    }).then(async (response) => {
      return response.json().then((json) => {
        console.log('json:', json)
        this._config = {}
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