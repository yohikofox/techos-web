import { DefinitionCollection } from "../dependencies";
import { ResolverDefinition } from "../dependency/resolver";

const baseRepositories: DefinitionCollection = {
  ContentManagerSystem: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/contentManagerRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ConfigManager"],
  },
  BaseSearchEngine: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/baseSearchEngineRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ConfigManager"],
  },
  StoreRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/storeRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ConfigManager"],
  },
};

const repositories: DefinitionCollection = {
  HeaderRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/headerRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "HeaderDataService"],
  },
  PostRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/postRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "PostService", "MetaService"],
  },
  MicroPostRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/microPostRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "MicroPostService"],
  },
  HomeRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/homeRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "HomeDataService"],
  },
  MicroPostSearchRepository: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/microPostSearchRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ConfigManager", "SearchService"],
  },
  OfflineRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/offlineRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "OffLineService"],
  },
  PostSearchRepository: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/postSearchEngineRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ConfigManager", "SearchService"],
  },
  ProductRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/productRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["StoreRepository", "ProductService"],
  },
  PostStatRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/postStatRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "PostStatService"],
  },
  SearchRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/searchRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "SearchService"],
  },
  TagRepository: {
    resolve: async <T>() =>
      import(`@infra/repositories/tagRepository`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ContentManagerSystem", "TagService", "PostService"],
  },
  SubscriptionRepository: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/subscriptionRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ContentManagerSystem", "WebPushNotificationService"],
  },
  WebPushNotificationRepository: {
    resolve: async <T>() =>
      import(
        `@infra/repositories/webPushNotificationRepository`
      ) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["ContentManagerSystem", "WebPushNotificationService"],
  },
};

const definitions: DefinitionCollection = {
  ...baseRepositories,
  ...repositories,
};

export default definitions;
