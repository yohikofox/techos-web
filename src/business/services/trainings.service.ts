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
      title: data.attributes.title,
      link: `/formation${data.attributes.link}`,
      background: await this.imageSetService.mapImageSet(data.attributes.background.data.attributes)
    }
    return model
  }
}