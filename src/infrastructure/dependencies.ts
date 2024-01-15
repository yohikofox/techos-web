import helperDependencies from './declarations/helpers'
import repositoryDependencies from './declarations/repositories'
import useCaseDependencies from './declarations/use-cases'
import domainDependencies from './declarations/domains'

export type Definition = {
  resolve: () => Promise<any>,
  type?: string,
  dependencies?: string[]
}

export type DefinitionCollection = Record<string, Definition>

export const ResourceMapping: DefinitionCollection = {
  ...helperDependencies,
  ...repositoryDependencies,
  ...useCaseDependencies,
  ...domainDependencies,
}
