const services = {
  'ImageSetService': {
    resolve: async () => import(`@services/imageSet.service`),
    dependencies: ['AssetBuilder']
  },
  'PostService': {
    resolve: async () => import(`@services/post.service`),
    dependencies: ['ImageSetService', 'TagService']
  },
  'MicroPostService': {
    resolve: async () => import(`@services/micro-post.service`),
    dependencies: ['ImageSetService', 'TagService', 'MetaService']
  },
  'MetaService': {
    resolve: async () => import(`@services/meta.service`),
    dependencies: []
  },
  'ProductService': {
    resolve: async () => import(`@services/product.service`),
    dependencies: []
  },
  'TagService': {
    resolve: async () => import(`@services/tag.service`),
    dependencies: ['HeroService']
  },
  'SearchService': {
    resolve: async () => import(`@services/search.service`),
    dependencies: ['PostService', 'MicroPostService']
  },
  'TrainingService': {
    resolve: async () => import(`@services/trainings.service`),
    dependencies: ["ImageSetService"]
  },
  'HeaderDataService': {
    resolve: async () => import(`@services/header-data.service`),
    dependencies: ['TrainingService']
  },
  'HeroService': {
    resolve: async () => import(`@services/hero.service`),
    dependencies: ['ImageSetService']
  },
  'WebPushNotificationService': {
    resolve: async () => import(`@services/web-push-notification.service`),
    dependencies: ['ImageSetService']
  },
  'OffLineService': {
    resolve: async () => import(`@services/offline.service`),
    dependencies: []
  },
  'HomeDataService': {
    resolve: async () => import(`@services/home-data.service`),
    dependencies: ['HeroService']
  },
  'PostStatService': {
    resolve: async () => import(`@services/post-stats.service`),
    dependencies: []
  },
}

const definitions = {
  ...services
}

export default definitions