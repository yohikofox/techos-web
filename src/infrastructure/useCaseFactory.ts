import { IOC } from "@infra/container";

import { Result } from "@/lib/result";

export enum UseCaseOption {
  GET_HOME_DATA = 'GetHomeData',
  GET_HEADER_DATA = 'GetHeaderData',
  GET_POST_LIST = 'GetPostList',
  GET_SEARCH_DATA = 'GetSearchData',
  GET_POST_DETAILS = 'GetPostDetails',
  GET_TAG_POST_LIST = 'GetTagPostList',
  GET_TAG_INFOS = 'GetTagInfos',
  UPDATE_POST_STATS = 'UpdatePostStats',
  SAVE_WEB_PUSH_SUBSCRIPTION = 'SaveSubscription',
  GET_WEB_PUSH_SUBSCRIPTION_LIST = 'GetSubscriptionList',
  GET_NOTIFICATION = 'GetNotification',
  DELETE_WEB_PUSH_SUBSCRIPTION = 'DeleteSubscription',
  GET_OFFLINE_PAGE_DATA = 'GetOfflinePageData',
  GET_RANDOM_PRODUCT = 'GetRandomProduct',
  GET_MICRO_POST_LIST = 'GetMicroPostList',
  GET_MICRO_POST_DETAILS = 'GetMicroPostDetails',
}

export interface IUseCase<TRequest, TResult> {
  execute(request?: TRequest): Promise<TResult>
}


type UseCaseStore = {
  [key in UseCaseOption]?: IUseCase<any, any>
}

export default class UseCaseFactory {
  private _useCases: UseCaseStore = {}
  private static _instances: UseCaseFactory;

  constructor() { }

  public static get Instance() {
    if (!this._instances) {
      this._instances = new UseCaseFactory()
    }

    return this._instances
  }

  public async getUseCase<TRequest, TResult, TEnum extends string>(option: UseCaseOption) {
    if (!this._useCases[option]) {
      const UseCase = await IOC().resolve<IUseCase<TRequest, TResult>>(option);
      this._useCases[option] = UseCase
    }
    return this._useCases[option] as IUseCase<TRequest, Result<TResult, TEnum>>
  }
}

