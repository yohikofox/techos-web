const definitions = {
  'GetHomeData': {
    resolve: async () => import('@biz/useCases/getHomeData'),
    dependencies: ['ContentManagerSystem', 'HomeDataService']
  },
  'GetHeaderData': {
    resolve: async () => import('@biz/useCases/getHeaderData'),
    dependencies: ['ContentManagerSystem', 'HeaderDataService']
  },
  'GetPostList': {
    resolve: async () => import('@biz/useCases/getPostList'),
    dependencies: ['ContentManagerSystem', 'PostService', 'MetaService']
  },
  'GetSearchData': {
    resolve: async () => import('@biz/useCases/getSearchData'),
    dependencies: ['SearchEngine', 'SearchService']
  },
  'GetPostDetails': {
    resolve: async () => import('@biz/useCases/getPostDetails'),
    dependencies: ['ContentManagerSystem', 'PostService']
  },
  'GetTagPostList': {
    resolve: async () => import('@biz/useCases/getTagPostList'),
    dependencies: ['ContentManagerSystem', 'PostService']
  },
  'GetTagInfos': {
    resolve: async () => import('@biz/useCases/getTagInfos'),
    dependencies: ['ContentManagerSystem', 'ImageSetService']
  },
  'UpdatePostStats': {
    resolve: async () => import('@biz/useCases/updatePostStats'),
    dependencies: ['ContentManagerSystem']
  },
  'SaveSubscription': {
    resolve: async () => import('@biz/useCases/saveSubscription'),
    dependencies: ['ContentManagerSystem']
  },
  'GetSubscriptionList': {
    resolve: async () => import('@biz/useCases/getSubscriptionList'),
    dependencies: ['ContentManagerSystem']
  },
  'GetNotification': {
    resolve: async () => import('@biz/useCases/getNotification'),
    dependencies: ['ContentManagerSystem', 'WebPushNotificationService']
  },
  'DeleteSubscription': {
    resolve: async () => import('@biz/useCases/deleteSubscription'),
    dependencies: ['ContentManagerSystem']
  },
  'GetOfflinePageData': {
    resolve: async () => import('@biz/useCases/getOfflinePageData'),
    dependencies: ['ContentManagerSystem', 'OffLineService']
  },
  'GetProductById': {
    resolve: async () => import('@biz/useCases/getProductById'),
    dependencies: ['Store', 'ProductService']
  },
  'GetRandomProduct': {
    resolve: async () => import('@biz/useCases/getRandomProduct'),
    dependencies: ['Store', 'ProductService']
  },
  'GetMicroPostList': {
    resolve: async () => import('@biz/useCases/getMicroPostList'),
    dependencies: ['ContentManagerSystem', 'MicroPostService', 'MetaService']
  },
  'GetMicroPostDetails': {
    resolve: async () => import('@biz/useCases/getMicroPostDetails'),
    dependencies: ['ContentManagerSystem', 'MicroPostService']
  },
}


export default definitions