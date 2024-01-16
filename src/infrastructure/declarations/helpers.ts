import { ResourceTypes } from '@/infrastructure/resourceTypes';
const definitions = {
  "TokenGenerator": {
    resolve: async () => import('@/infrastructure/security/token'),
    dependencies: ['ConfigManager'],
    type: ResourceTypes.Singleton
  },
  'ConfigManager': {
    resolve: async () => import('@/infrastructure/adapter/configManager'),
    type: ResourceTypes.Singleton
  },
  'AssetBuilder': {
    resolve: async () => import('@/infrastructure/helper/assetBuilder'),
    dependencies: ['ConfigManager']
  },
}

export default definitions