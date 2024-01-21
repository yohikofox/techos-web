
const definitions = {
  'ImageSetService': {
    resolve: async () => import('@biz/services/imageSet.service'),
    dependencies: ['AssetBuilder']
  },
  'PostService': {
    resolve: async () => import('@biz/services/post.service'),
    dependencies: ['ImageSetService', 'TagService']
  },
  'MicroPostService': {
    resolve: async () => import('@biz/services/micro-post.service'),
    dependencies: ['ImageSetService', 'TagService', 'MetaService']
  },
  'MetaService': {
    resolve: async () => import('@biz/services/meta.service'),
    dependencies: []
  },
  'ProductService': {
    resolve: async () => import('@biz/services/product.service'),
    dependencies: []
  },
  'TagService': {
    resolve: async () => import('@biz/services/tag.service'),
    dependencies: ['HeroService']
  },
  'SearchService': {
    resolve: async () => import('@biz/services/search.service'),
    dependencies: ['PostService', 'MicroPostService']
  },
  'TrainingService': {
    resolve: async () => import('@biz/services/trainings.service'),
    dependencies: ["ImageSetService"]
  },
  'HeaderDataService': {
    resolve: async () => import('@biz/services/header-data.service'),
    dependencies: ['TrainingService']
  },
  'HeroService': {
    resolve: async () => import('@biz/services/hero.service'),
    dependencies: ['ImageSetService']
  },
  'WebPushNotificationService': {
    resolve: async () => import('@biz/services/web-push-notification.service'),
    dependencies: ['ImageSetService']
  },
  'OffLineService': {
    resolve: async () => import('@biz/services/offline.service'),
    dependencies: []
  },
  'HomeDataService': {
    resolve: async () => import('@biz/services/home-data.service'),
    dependencies: ['HeroService']
  },
  'PostStatService': {
    resolve: async () => import('@biz/services/post-stats.service'),
    dependencies: []
  },
}

export default definitions