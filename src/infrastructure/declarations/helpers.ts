import { ResourceTypes } from "@/infrastructure/resourceTypes";

import { DefinitionCollection } from "../dependencies";
import { ResolverDefinition } from "../dependency/resolver";

const definitions: DefinitionCollection = {
  TokenGenerator: {
    resolve: async <T>() =>
      import("@infra/security/token") as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ConfigManager"],
    type: ResourceTypes.Singleton,
  },
  ConfigManager: {
    resolve: async <T>() =>
      import("@infra/adapter/configManager") as unknown as Promise<
        ResolverDefinition<T>
      >,
    type: ResourceTypes.Singleton,
  },
  AssetBuilder: {
    resolve: async <T>() =>
      import("@infra/helper/assetBuilder") as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ConfigManager"],
  },
};

export default definitions;
