
const baseRepositories = {
  'ContentManagerSystem': {
    resolve: async () => import(`@infra/repositories/contentManagerRepository`),
    dependencies: ['ConfigManager']
  },
  'SearchEngine': {
    resolve: async () => import(`@infra/repositories/searchEngineRepository`),
    dependencies: ['ConfigManager']
  },
  'StoreRepository': {
    resolve: async () => import(`@infra/repositories/storeRepository`),
    dependencies: ['ConfigManager']
  },
}

const repositories = {
  'HeaderRepository': {
    resolve: async () => import(`@infra/repositories/headerRepository`),
    dependencies: ['ContentManagerSystem', 'HeaderDataService']
  },
  'HomeRepository': {
    resolve: async () => import(`@infra/repositories/homeRepository`),
    dependencies: ['ContentManagerSystem', 'HomeDataService']
  },
  'MicroPostRepository': {
    resolve: async () => import(`@infra/repositories/microPostRepository`),
    dependencies: ['ContentManagerSystem', 'MicroPostService']
  },
  'OfflineRepository': {
    resolve: async () => import(`@infra/repositories/offlineRepository`),
    dependencies: ['ContentManagerSystem', 'OffLineService']
  },
  'PostRepository': {
    resolve: async () => import(`@infra/repositories/postRepository`),
    dependencies: ['ContentManagerSystem', 'PostService', 'MetaService']
  },
  'ProductRepository': {
    resolve: async () => import(`@infra/repositories/productRepository`),
    dependencies: ['StoreRepository', 'ProductService']
  },
  'PostStatRepository': {
    resolve: async () => import(`@infra/repositories/postStatRepository`),
    dependencies: ['ContentManagerSystem', 'PostStatService']
  },
  'SearchRepository': {
    resolve: async () => import(`@infra/repositories/searchRepository`),
    dependencies: ['SearchEngine', 'SearchService']
  },
  'TagRepository': {
    resolve: async () => import(`@infra/repositories/tagRepository`),
    dependencies: ['ContentManagerSystem', 'TagService', 'PostService']
  },
  'SubscriptionRepository': {
    resolve: async () => import(`@infra/repositories/subscriptionRepository`),
    dependencies: ['ContentManagerSystem', 'WebPushNotificationService']
  },
  'WebPushNotificationRepository': {
    resolve: async () => import(`@infra/repositories/webPushNotificationRepository`),
    dependencies: ['ContentManagerSystem', 'WebPushNotificationService']
  },
}

const definitions = {
  ...baseRepositories,
  ...repositories,
}

export default definitions