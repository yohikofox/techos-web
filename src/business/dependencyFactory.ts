import { ResourceMapping, ResourceTypes } from "./dependencies"

declare global {
  var singletonContainer: InstanceStore
}

type InstanceStore = {
  [key: string]: any
}

export default class Container {
  private static _instances: Container;

  public static get Instance() {
    if (!this._instances) {
      console.warn('Container not initialized')
      this._instances = new Container()
    }

    return this._instances
  }

  private get singletonContainer() {
    if (!globalThis.singletonContainer) {
      globalThis.singletonContainer = {}
    }
    return globalThis.singletonContainer
  }

  public async resolve<T>(key: string): Promise<any> {
    return await this.getResource(key) as T
  }

  private async getResource(key: string): Promise<any> {
    if (!ResourceMapping[key]) throw new Error(`Resource ${key} not found`)

    if (ResourceMapping[key].type === ResourceTypes.Singleton) {
      if (!this.singletonContainer[key]) {
        this.singletonContainer[key] = this.buildInstance(key)
      }
      return this.singletonContainer[key]
    }

    return this.buildInstance(key)
  }

  private async buildInstance(key: string) {
    const dependenciesRequests = ResourceMapping[key].dependencies?.map(async (dependency: string) => {
      return await this.getResource(dependency)
    })

    const dependencies = await Promise.all(dependenciesRequests || [])
    return new (await ResourceMapping[key].resolve()).default(...dependencies)
  }
}