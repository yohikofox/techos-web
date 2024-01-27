import applicationDependencies from './declarations/application'
import helperDependencies from './declarations/helpers'
import infrastructureDependencies from './declarations/infrastructure'
import repositoryDependencies from './declarations/repositories'

export type Definition = {
  resolve: () => Promise<any>,
  type?: string,
  dependencies?: string[]
}

export type DefinitionCollection = Record<string, Definition>

export const ResourceMapping: DefinitionCollection = {
  ...helperDependencies,
  ...repositoryDependencies,
  ...applicationDependencies,
  ...infrastructureDependencies,
}
