import slugify from 'slugify'

export enum ResourceTypes {
  Singleton = 'Singleton',
  Transient = 'Transient'
}


const helperDependencies = {
  "Helper/TokenGenerator": {
    resolve: async () => import('@/infrastructure/security/token'),
    DependencyKeys: ['Helper/ConfigManager'],
    type: ResourceTypes.Singleton
  },
  'Helper/ConfigManager': {
    resolve: async () => import('@/infrastructure/adapter/configManager'),
    type: ResourceTypes.Singleton
  },
  'Helper/AssetBuilder': {
    resolve: async () => import('@/infrastructure/helper/assetBuilder'),
    dependencies: ['Helper/ConfigManager']
  },
}



const repositoryDependencies = {
  'Repo/ContentManagerSystem': {
    resolve: async () => import('@/infrastructure/adapter/contentManagerRepository.repo'),
    dependencies: ['Helper/ConfigManager']
  },
  'Repo/SearchEngine': {
    resolve: async () => import('@/infrastructure/adapter/searchEngineRepository.repo'),
    dependencies: ['Helper/ConfigManager']
  },
}


const useCaseDependencies = {
  'UseCase/GetHomeData': {
    resolve: async () => import('@biz/useCases/getHomeData'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/ImageSetService']
  },
  'UseCase/GetHeaderData': {
    resolve: async () => import('@biz/useCases/getHeaderData'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/ImageSetService']
  },
  'UseCase/GetPostList': {
    resolve: async () => import('@biz/useCases/getPostList'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/PostService', 'Domain/MetaService']
  },
  'UseCase/GetSearchData': {
    resolve: async () => import('@biz/useCases/getSearchData'),
    dependencies: ['Repo/SearchEngine', 'Domain/ImageSetService']
  },
  'UseCase/GetPostDetails': {
    resolve: async () => import('@biz/useCases/getPostDetails'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/ImageSetService']
  },
  'UseCase/GetTagPostList': {
    resolve: async () => import('@biz/useCases/getTagPostList'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/PostService']
  },
  'UseCase/GetTagInfos': {
    resolve: async () => import('@biz/useCases/getTagInfos'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/ImageSetService']
  },
  'UseCase/UpdatePostStats': {
    resolve: async () => import('@biz/useCases/updatePostStats'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/SaveSubscription': {
    resolve: async () => import('@biz/useCases/saveSubscription'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetSubscriptionList': {
    resolve: async () => import('@biz/useCases/getSubscriptionList'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetNotification': {
    resolve: async () => import('@biz/useCases/getNotification'),
    dependencies: ['Repo/ContentManagerSystem', 'Domain/ImageSetService']
  },
  'UseCase/DeleteSubscription': {
    resolve: async () => import('@biz/useCases/deleteSubscription'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetOfflinePageData': {
    resolve: async () => import('@biz/useCases/getOfflinePageData'),
    dependencies: ['Repo/ContentManagerSystem']
  },
}


const domainDependencies = {
  'Domain/ImageSetService': {
    resolve: async () => import('@biz/services/imageSet.service'),
    dependencies: ['Helper/AssetBuilder']
  },
  'Domain/PostService': {
    resolve: async () => import('@biz/services/post.service'),
    dependencies: ['Domain/ImageSetService']
  },
  'Domain/MetaService': {
    resolve: async () => import('@biz/services/meta.service'),
    dependencies: []
  },
}


export const ResourceMapping: {
  [key: string]: {
    resolve: () => Promise<any>,
    type?: ResourceTypes,
    dependencies?: string[]
  }
} = {
  ...helperDependencies,
  ...repositoryDependencies,
  ...useCaseDependencies,
  ...domainDependencies,

}


const DependencyKeys: { [x: string]: string } = {}

Object.keys(ResourceMapping).forEach(key => {
  const dep_key = slugify(key.replace('/', '_'), {
    lower: true,
    replacement: '_'
  })
  DependencyKeys[dep_key] = key
})

export {
  DependencyKeys
}



