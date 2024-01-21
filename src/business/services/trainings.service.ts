import Training from "../model/training";
import { TrainingData } from "./dto/training.dto";
import { IImageSetService } from "./imageSet.service";

export interface ITrainingService {
  mapToTraining(data: TrainingData): Promise<Training>
}

export default class TrainingService implements ITrainingService {
  constructor(private imageSetService: IImageSetService) { }

  async mapToTraining(data: TrainingData): Promise<Training> {
    const model = {
      title: data.title,
      link: `/formation${data.link}`,
      background: await this.imageSetService.mapImageSet(data.background)
    }
    return model
  }
}