import helperDependencies from './declarations/helpers'
import repositoryDependencies from './declarations/repositories'
import applicationDependencies from './declarations/application'
import infrastructureDependencies from './declarations/infrastructure'

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
