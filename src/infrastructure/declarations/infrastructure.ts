import { ResolverDefinition } from "../dependency/resolver";

const services = {
  ImageSetService: {
    resolve: async <T>() =>
      import(`@services/imageSet.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["AssetBuilder"],
  },
  PostService: {
    resolve: async <T>() =>
      import(`@services/post.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ImageSetService", "TagService", "PostStatService"],
  },
  MicroPostService: {
    resolve: async <T>() =>
      import(`@services/micro-post.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ImageSetService", "TagService", "MetaService"],
  },
  MetaService: {
    resolve: async <T>() =>
      import(`@services/meta.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [],
  },
  ProductService: {
    resolve: async <T>() =>
      import(`@services/product.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [],
  },
  TagService: {
    resolve: async <T>() =>
      import(`@services/tag.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["HeroService"],
  },
  SearchService: {
    resolve: async <T>() =>
      import(`@services/search.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["PostService", "MicroPostService"],
  },
  TrainingService: {
    resolve: async <T>() =>
      import(`@services/trainings.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ImageSetService"],
  },
  HeaderDataService: {
    resolve: async <T>() =>
      import(`@services/header-data.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["TrainingService"],
  },
  HeroService: {
    resolve: async <T>() =>
      import(`@services/hero.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ImageSetService"],
  },
  WebPushNotificationService: {
    resolve: async <T>() =>
      import(`@services/web-push-notification.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ImageSetService"],
  },
  OffLineService: {
    resolve: async <T>() =>
      import(`@services/offline.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [],
  },
  HomeDataService: {
    resolve: async <T>() =>
      import(`@services/home-data.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["HeroService"],
  },
  PostStatService: {
    resolve: async <T>() =>
      import(`@services/post-stats.service`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [],
  },
};

const definitions = {
  ...services,
};

export default definitions;
