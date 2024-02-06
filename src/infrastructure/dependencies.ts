import applicationDependencies from "./declarations/application";
import helperDependencies from "./declarations/helpers";
import infrastructureDependencies from "./declarations/infrastructure";
import repositoryDependencies from "./declarations/repositories";
import { ResolverDefinition } from "./dependency/resolver";

export type Definition = {
  resolve: <T>() => Promise<ResolverDefinition<T>>;
  type?: string;
  dependencies?: string[];
};

export type DefinitionCollection = Record<string, Definition>;

export const ResourceMapping: DefinitionCollection = {
  ...helperDependencies,
  ...repositoryDependencies,
  ...applicationDependencies,
  ...infrastructureDependencies,
};
