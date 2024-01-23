
const definitions = {
  'GetHomeData': {
    resolve: async () => import(`@app/getHomeData`),
    dependencies: ['HomeRepository']
  },
  'GetHeaderData': {
    resolve: async () => import(`@app/getHeaderData`),
    dependencies: ['HeaderRepository']
  },
  'GetPostList': {
    resolve: async () => import(`@app/getPostList`),
    dependencies: ['PostRepository']
  },
  'GetSearchData': {
    resolve: async () => import(`@app/getSearchData`),
    dependencies: ['SearchRepository']
  },
  'GetPostDetails': {
    resolve: async () => import(`@app/getPostDetails`),
    dependencies: ['PostRepository']
  },
  'GetTagPostList': {
    resolve: async () => import(`@app/getTagPostList`),
    dependencies: ['TagRepository']
  },
  'GetTagInfos': {
    resolve: async () => import(`@app/getTagInfos`),
    dependencies: ['TagRepository']
  },
  'UpdatePostStats': {
    resolve: async () => import(`@app/updatePostStats`),
    dependencies: ['PostStatRepository']
  },
  'SaveSubscription': {
    resolve: async () => import(`@app/saveSubscription`),
    dependencies: ['SubscriptionRepository']
  },
  'GetSubscriptionList': {
    resolve: async () => import(`@app/getSubscriptionList`),
    dependencies: ['SubscriptionRepository']
  },
  'DeleteSubscription': {
    resolve: async () => import(`@app/deleteSubscription`),
    dependencies: ['SubscriptionRepository']
  },
  'GetNotification': {
    resolve: async () => import(`@app/getNotification`),
    dependencies: ['WebPushNotificationRepository']
  },
  'GetOfflinePageData': {
    resolve: async () => import(`@app/getOfflinePageData`),
    dependencies: ['OfflineRepository']
  },
  'GetProductById': {
    resolve: async () => import(`@app/getProductById`),
    dependencies: ['ProductRepository']
  },
  'GetRandomProduct': {
    resolve: async () => import(`@app/getRandomProduct`),
    dependencies: ['ProductRepository']
  },
  'GetMicroPostList': {
    resolve: async () => import(`@app/getMicroPostList`),
    dependencies: ['MicroPostRepository']
  },
  'GetMicroPostDetails': {
    resolve: async () => import(`@app/getMicroPostDetails`),
    dependencies: ['MicroPostRepository']
  },
}


export default definitions