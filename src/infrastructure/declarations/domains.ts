
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
    dependencies: ['ImageSetService', 'TagService']
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
    dependencies: []
  },
  'SearchService': {
    resolve: async () => import('@biz/services/search.service'),
    dependencies: ['PostService', 'MicroPostService']
  },
}

export default definitions