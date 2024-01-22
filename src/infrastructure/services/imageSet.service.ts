import { IAssetBuilder } from "@/infrastructure/helper/assetBuilder"
import ImageSet from "@domain/image"
import { PictureData } from "@dto/picture.dto"

export interface IImageSetService {
  mapImageSet(image: PictureData, options?: ImageSetOptions): Promise<ImageSet>
}

export enum ImageSetPreset {
  THUMBNAIL = 'thumbnail',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export type ImageSetOptions = {
  preset?: ImageSetPreset
}

//TODO: rework this

export default class ImageSetService implements IImageSetService {
  constructor(private assetBuilder: IAssetBuilder) { }
  async mapImageSet(image: PictureData, options?: ImageSetOptions): Promise<ImageSet> {
    return {
      src: await this.assetBuilder.buildAssetUri(image.data.attributes.url),
      srcSet: {},
      placeholderUrl: '',
      width: image.data.attributes.width,
      height: image.data.attributes.height,
      name: image.data.attributes.name,
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