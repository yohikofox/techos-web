import { HomeDataResult } from "@app/getHomeData";
import Home from "@domain/home";
import { Result } from "@lib/result";

export interface IHomeRepository {
  getHomeData(request?: void): Promise<Result<Home, HomeDataResult>>
}