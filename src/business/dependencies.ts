export const ResourceMapping: {
  [key: string]: {
    resolve: () => Promise<any>,
    dependencies?: string[]
  }
} = {
  'Repo/ContentManagerSystem': {
    resolve: async () => import('@biz/infrastructure/adapter/contentManagerRepository.repo')
  },
  'Repo/SearchEngine': {
    resolve: async () => import('@biz/infrastructure/adapter/searchEngineRepository.repo')
  },
  'UseCase/GetHomeData': {
    resolve: async () => import('@biz/useCases/getHomeData'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetHeaderData': {
    resolve: async () => import('@biz/useCases/getHeaderData'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetPostList': {
    resolve: async () => import('@biz/useCases/getPostList'),
    dependencies: ['Repo/ContentManagerSystem']
  },
  'UseCase/GetSearchData': {
    resolve: async () => import('@biz/useCases/getSearchData'),
    dependencies: ['Repo/SearchEngine']
  },
  'UseCase/GetPostDetails': {
    resolve: async () => import('@biz/useCases/getPostDetails'),
    dependencies: ['Repo/ContentManagerSystem']
  },
}
