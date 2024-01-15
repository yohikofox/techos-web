import { ResourceTypes } from "./resourceTypes"
import { Definition, DefinitionCollection, ResourceMapping } from "./dependencies"

export const IOC = () => {
  const c = Container.Instance
  c.registerDependencies(ResourceMapping)
  return c
}

declare global {
  var singletonContainer: InstanceStore
}

type InstanceStore = {
  [key: string]: any
}

interface IContainer {
  resolve<T>(key: string): Promise<T>;
}

export default class Container implements IContainer {
  private static _instances: Container;
  private definitions: DefinitionCollection;

  public static get Instance() {
    if (!this._instances) {
      this._instances = new Container()
    }

    return this._instances
  }

  public registerDependencies(dependencies: DefinitionCollection) {
    if (this.isLoaded) return
    this.definitions = dependencies
  }

  public register(key: string, definition: Definition) {
    this.definitions[key] = definition
  }

  constructor(definitions?: DefinitionCollection) {
    this.definitions = definitions || {}
  }


  public get isLoaded() {
    return Object.keys(this.definitions).length > 0
  }

  private get singletonContainer() {
    if (!globalThis.singletonContainer) {
      globalThis.singletonContainer = {}
    }
    return globalThis.singletonContainer
  }

  public async resolve<T>(key: string): Promise<T> {
    return await this.getResource(key) as T
  }

  private async getResource(key: string): Promise<any> {
    if (!this.definitions[key]) {
      throw new Error(`Resource ${key} not found`)
    }

    if (this.definitions[key].type === ResourceTypes.Singleton) {
      if (!this.singletonContainer[key]) {
        this.singletonContainer[key] = this.buildInstance(key)
      }
      return this.singletonContainer[key]
    }

    return this.buildInstance(key)
  }

  private async buildInstance(key: string) {
    const dependenciesRequests = this.definitions[key].dependencies?.map(async (dependency: string) => {
      return await this.getResource(dependency)
    })

    const dependencies = await Promise.all(dependenciesRequests || [])
    return new (await this.definitions[key].resolve()).default(...dependencies)
  }
}