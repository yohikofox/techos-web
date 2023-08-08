import { ResourceMapping } from "./dependencies"
import { Result } from "./result"


export enum UseCaseOption {
  GET_HOME_DATA = 'GetHomeData',
  GET_HEADER_DATA = 'GetHeaderData',
  GET_POST_LIST = 'GetPostList',
  GET_SEARCH_DATA = 'GetSearchData',
  GET_POST_DETAILS = 'GetPostDetails',
  GET_TAG_POST_LIST = 'GetTagPostList',
  GET_TAG_INFOS = 'GetTagInfos',
}

export interface IUseCase<TRequest, TResult> {
  execute(request?: TRequest): Promise<TResult>
}

type UseCaseStore = {
  [key in UseCaseOption]?: IUseCase<any, any>
}

type Container = {
  [key: string]: any
}

export default class UseCaseFactory {

  private static _instance: UseCaseFactory
  private _useCases: UseCaseStore = {}
  private _container: Container = {}

  public static get Instance() {
    if (!this._instance) {
      this._instance = new UseCaseFactory()
    }

    return this._instance
  }

  public async get<TRequest, TResult, TEnum extends string>(option: UseCaseOption) {
    if (!this._useCases[option]) {
      const UseCase = await this.getResource('UseCase/' + option);
      this._useCases[option] = UseCase
    }
    return this._useCases[option] as IUseCase<TRequest, Result<TResult, TEnum>>
  }

  private async getResource(key: string, missingHandler?: (key: string) => any) {
    if (!this._container[key]) {
      if (missingHandler) {
        this._container[key] = missingHandler(key)
      } else {
        const dependenciesRequests = ResourceMapping[key].dependencies?.map(async (dependency: string) => {
          return await this.getResource(dependency)
        })
        const dependencies = await Promise.all(dependenciesRequests || [])
        this._container[key] = new (await ResourceMapping[key].resolve()).default(...dependencies)
      }
    }
    return this._container[key]
  }
}