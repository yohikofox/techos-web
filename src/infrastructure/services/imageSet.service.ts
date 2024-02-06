import ImageSet from "@domain/image";
import { PictureData } from "@dto/picture.dto";
import { hasProperty } from "@lib/prototypes/object";

import { IAssetBuilder } from "@/infrastructure/helper/assetBuilder";

export interface IImageSetService {
  mapImageSet(image: PictureData, options?: ImageSetOptions): Promise<ImageSet>;
}

export enum ImageSetPreset {
  NONE = "none",
  THUMBNAIL = "thumbnail",
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}

export type ImageSetOptions = {
  preset?: ImageSetPreset;
};

//TODO: rework this

export default class ImageSetService implements IImageSetService {
  constructor(private assetBuilder: IAssetBuilder) {}
  async mapImageSet(
    image: PictureData,
    options?: ImageSetOptions
  ): Promise<ImageSet> {
    let src;
    const preset =
      options?.preset !== undefined ? options?.preset : ImageSetPreset.SMALL;

    const sizesArray: string[] = [];

    if (image.formats !== undefined) {
      if (
        preset !== ImageSetPreset.NONE &&
        hasProperty(image.formats, preset) === true
      ) {
        src = image.formats[preset];
      }

      const sizes = [];
      const maxScreenWidth = 1920;

      for (const format in image.formats) {
        if (hasProperty(image.formats, format) === true) {
          const fmt = image.formats[format];
          sizes.push({ width: image.formats[format].width, format: fmt });
        }
      }

      sizes.sort(
        (a, b) =>
          b.format.width / maxScreenWidth - a.format.width / maxScreenWidth
      );

      for (const src of sizes) {
        sizesArray.push(
          `(max-width: ${src.format.width}px) ${Math.round((src.format.width / maxScreenWidth) * 100)}w`
        );
      }
    }

    const asset = src !== undefined ? src : image;

    return {
      src: await this.assetBuilder.buildAssetUri(asset.url),
      sizes:
        "100vw" + (sizesArray.length > 0 ? ", " : "") + sizesArray.join(", "),
      placeholderUrl: "",
      width: asset.width,
      height: asset.height,
      name: asset.name,
      preset: preset,
    };
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
