import {
  Definition,
  DefinitionCollection,
  ResourceMapping,
} from "./dependencies";
import { ResourceTypes } from "./resourceTypes";

export const IOC: () => IContainer = () => {
  const c = Container.Instance;
  c.registerDependencies(ResourceMapping);
  return c;
};

declare global {
  // eslint-disable-next-line no-var
  var singletonContainer: InstanceStore;
}

type InstanceStore = {
  [key: string]: unknown;
};

interface IContainer {
  resolve<T>(key: string): Promise<T>;
}

export default class Container implements IContainer {
  private static _instances: Container;
  private definitions: DefinitionCollection;

  public static get Instance() {
    if (this._instances === undefined) {
      this._instances = new Container();
    }

    return this._instances;
  }

  public registerDependencies(dependencies: DefinitionCollection) {
    if (this.isLoaded) return;
    this.definitions = dependencies;
    this.testDependencies();
  }

  public register(key: string, definition: Definition) {
    this.definitions[key] = definition;
  }

  constructor(definitions?: DefinitionCollection) {
    this.definitions = definitions || {};
  }

  public get isLoaded() {
    return Object.keys(this.definitions).length > 0;
  }

  private get singletonContainer() {
    if (globalThis.singletonContainer === undefined) {
      globalThis.singletonContainer = {};
    }
    return globalThis.singletonContainer;
  }

  public async resolve<T>(key: string): Promise<T> {
    return (await this.getResource(key)) as T;
  }

  private async getResource<T>(key: string): Promise<T> {
    if (this.definitions[key] === undefined) {
      throw new Error(`Resource ${key} not found`);
    }

    if (this.definitions[key].type === ResourceTypes.Singleton) {
      if (this.singletonContainer[key] === undefined) {
        this.singletonContainer[key] = this.buildInstance(key);
      }
      return this.singletonContainer[key] as T;
    }

    return this.buildInstance(key);
  }

  private async testDependencies() {
    const keys = Object.keys(this.definitions);
    const dependencies = keys.map(async (key) => {
      return await this.getResource(key);
    });

    return await Promise.all(dependencies);
  }

  private async buildInstance<T>(key: string) {
    const dependenciesRequests = this.definitions[key].dependencies?.map(
      async (dependency: string) => {
        return await this.getResource(dependency);
      }
    );

    const dependencies = await Promise.all(dependenciesRequests || []);
    const resolver = await this.definitions[key].resolve<T>();

    return new resolver.default(...dependencies);
  }
}
