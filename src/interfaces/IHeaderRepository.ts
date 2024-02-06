import { GetHeaderRequest, HeaderResult } from "@app/getHeaderData";
import Header from "@domain/header";
import { Result } from "@lib/result";

export interface IHeaderRepository {
  getHeaderData(request?: GetHeaderRequest): Promise<Result<Header, HeaderResult>>
}
