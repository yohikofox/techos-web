import { HomeDataResult } from "@app/getHomeData";
import Home from "@domain/home";
import { Result } from "@lib/result";

export interface IHomeRepository {
  getHeaderData(request?: any): Promise<Result<Home, HomeDataResult>>
}