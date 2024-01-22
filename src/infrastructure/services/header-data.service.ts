import Header from "@domain/header";
import { HeaderData } from "@dto/header-data.dto";
import { TrainingData } from "@dto/training.dto";
import { ITrainingService } from "@services/trainings.service";

export interface IHeaderDataService {
  mapToHeader(data: HeaderData, trainings: TrainingData[]): Promise<Header>
}
export default class HeaderDataService implements IHeaderDataService {
  constructor(private trainingService: ITrainingService) { }

  async mapToHeader(data: HeaderData, trainings?: TrainingData[]): Promise<Header> {
    const model = {
      search: {
        placeholder: data.placeholder,
        search_title: data.search_title
      },
      trainings: {
        items: trainings ? await Promise.all(trainings.map(m => this.trainingService.mapToTraining(m))) : []
      }
    } as Header

    return model
  }
}
