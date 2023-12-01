import { IAssetBuilder } from "@/infrastructure/helper/assetBuilder"
import ImageSet from "../model/image"

export interface IImageSetService {
  mapImageSet(image: any): Promise<ImageSet>
}


//TODO: rework this

export default class ImageSetService implements IImageSetService {
  constructor(private assetBuilder: IAssetBuilder) { }
  async mapImageSet(image: any): Promise<ImageSet> {
    return {
      src: await this.assetBuilder.buildAssetUri(image.url),
      srcSet: {},
      placeholderUrl: '',
      width: image.width,
      height: image.height,
      name: image.name,
    }
  }

  // async mapImageSet(image: any) {
  //   return {
  //     src: await this.assetBuilder.buildAssetUri(image.url),
  //     width: image.width,
  //     height: image.height,
  //     name: image.name,
  //   }
  // }
}