import slugify from 'slugify'

export enum ResourceTypes {
  Singleton = 'Singleton',
  Transient = 'Transient'
}
export const ResourceMapping: {
  [key: string]: {
    resolve: () => Promise<any>,
    type?: ResourceTypes,
    dependencies?: string[]
  }
} = {
  'Helper/ConfigManager': {
    resolve: async () => import('@biz/infrastructure/adapter/configManager'),
    type: ResourceTypes.Singleton
  },
  'Helper/AssetBuilder': {
    resolve: async () => import('@/utils/helper/assetBuilder'),
    dependencies: ['Helper/ConfigManager']
  },
  'Repo/ContentManagerSystem': {
    resolve: async () => import('@biz/infrastructure/adapter/contentManagerRepository.repo'),
    dependencies: ['Helper/ConfigManager']
  },
  'Repo/SearchEngine': {
    resolve: async () => import('@biz/infrastructure/adapter/searchEngineRepository.repo'),
    dependencies: ['Helper/ConfigManager']
  },
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
    dependencies: ['Repo/ContentManagerSystem', 'Domain/PostService']
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
  'Domain/ImageSetService': {
    resolve: async () => import('@biz/services/imageSet.service'),
    dependencies: ['Helper/AssetBuilder']
  },
  'Domain/PostService': {
    resolve: async () => import('@biz/services/post.service'),
    dependencies: ['Domain/ImageSetService']
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