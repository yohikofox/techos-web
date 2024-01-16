const definitions = {
  'ContentManagerSystem': {
    resolve: async () => import('@/infrastructure/adapter/contentManagerRepository.repo'),
    dependencies: ['ConfigManager']
  },
  'SearchEngine': {
    resolve: async () => import('@/infrastructure/adapter/searchEngineRepository.repo'),
    dependencies: ['ConfigManager']
  },
  'Store': {
    resolve: async () => import('@/infrastructure/adapter/store.repo'),
    dependencies: ['ConfigManager']
  },
}

export default definitions