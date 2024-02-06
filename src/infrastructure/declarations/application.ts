import { DefinitionCollection } from "../dependencies";
import { ResolverDefinition } from "../dependency/resolver";
import { ResourceTypes } from "../resourceTypes";

const adapters: DefinitionCollection = {
  PostAdapter: {
    resolve: async <T>() =>
      import(`@infra/adapter/postAdapter`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [
      "PostSearchRepository",
      "SearchRepository",
      "SearchService",
      "PostService",
    ],
  },
  MicroPostAdapter: {
    resolve: async <T>() =>
      import(`@infra/adapter/microPostAdapter`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: [
      "MicroPostSearchRepository",
      "SearchRepository",
      "SearchService",
      "MicroPostService",
    ],
  },
};

const useCases: DefinitionCollection = {
  GetHomeData: {
    resolve: async <T>() =>
      import("@app/getHomeData") as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["HomeRepository"],
    type: ResourceTypes.Transient,
  },
  GetHeaderData: {
    resolve: async <T>() =>
      import(`@app/getHeaderData`) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["HeaderRepository"],
  },
  GetPostList: {
    resolve: async <T>() =>
      import(`@app/getPostList`) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["PostRepository"],
  },
  // GetSearchData: {
  //   resolve: async <T>() =>
  //     import(`@app/getSearchData`) as unknown as Promise<ResolverDefinition<T>>,
  //   dependencies: ["SearchRepository"],
  // },
  GetPostDetails: {
    resolve: async <T>() =>
      import(`@app/getPostDetails`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["PostRepository"],
  },
  GetTagPostList: {
    resolve: async <T>() =>
      import(`@app/getTagPostList`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["TagRepository"],
  },
  GetTagInfos: {
    resolve: async <T>() =>
      import(`@app/getTagInfos`) as unknown as Promise<ResolverDefinition<T>>,
    dependencies: ["TagRepository"],
  },
  UpdatePostStats: {
    resolve: async <T>() =>
      import(`@app/updatePostStats`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["PostStatRepository"],
  },
  SaveSubscription: {
    resolve: async <T>() =>
      import(`@app/saveSubscription`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["SubscriptionRepository"],
  },
  GetSubscriptionList: {
    resolve: async <T>() =>
      import(`@app/getSubscriptionList`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["SubscriptionRepository"],
  },
  DeleteSubscription: {
    resolve: async <T>() =>
      import(`@app/deleteSubscription`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["SubscriptionRepository"],
  },
  GetNotification: {
    resolve: async <T>() =>
      import(`@app/getNotification`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["WebPushNotificationRepository"],
  },
  GetOfflinePageData: {
    resolve: async <T>() =>
      import(`@app/getOfflinePageData`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["OfflineRepository"],
  },
  GetProductById: {
    resolve: async <T>() =>
      import(`@app/getProductById`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ProductRepository"],
  },
  GetRandomProduct: {
    resolve: async <T>() =>
      import(`@app/getRandomProduct`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["ProductRepository"],
  },
  GetMicroPostList: {
    resolve: async <T>() =>
      import(`@app/getMicroPostList`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["MicroPostAdapter"], //MicroPostRepository
  },
  GetMicroPostDetails: {
    resolve: async <T>() =>
      import(`@app/getMicroPostDetails`) as unknown as Promise<
        ResolverDefinition<T>
      >,
    dependencies: ["MicroPostRepository"],
  },
};

const declarations: DefinitionCollection = { ...useCases, ...adapters };

export default declarations;
