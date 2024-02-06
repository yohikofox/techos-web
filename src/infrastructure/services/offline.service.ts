import OffLinePageData from "@domain/offLinePageData";
import { OffLineData } from "@dto/offline.dto";

export interface IOffLineService {
  mapOffLine(data: OffLineData): Promise<OffLinePageData>;
}
export default class OffLineService implements IOffLineService {
  async mapOffLine(data: OffLineData): Promise<OffLinePageData> {
    const result = {
      title: data.title,
      content: data.content,
    };

    return result;
  }
}
