import Meta from "../model/meta";
import { MetaData } from "./dto/meta.dto";

export interface IMetaService {
  mapMeta(data: MetaData): Promise<Meta>
}

export default class MetaService {
  constructor() {
  }

  async mapMeta(data: MetaData): Promise<Meta> {
    return {
      pagination: {
        page: data.pagination.page,
        pageSize: data.pagination.pageSize,
        pageCount: data.pagination.pageCount,
        total: data.pagination.total,
      }
    } as Meta
  }
} 