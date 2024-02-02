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
    let src = image;
    const preset =
      options?.preset !== undefined ? options?.preset : ImageSetPreset.SMALL;

    if (src.formats) {
      if (
        preset !== ImageSetPreset.NONE &&
        hasProperty(src.formats, preset) === true
      ) {
        src = src.formats[preset];
      }
    }
    const sizesArray: string[] = [];

    if (src.formats !== undefined) {
      const sizes = [];
      const maxScreenWidth = 1920;

      for (const format in src.formats) {
        if (hasProperty(src.formats, format) === true) {
          const fmt = src.formats[format];
          sizes.push({ width: src.formats[format].width, format: fmt });
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

    return {
      src: await this.assetBuilder.buildAssetUri(src.url),
      sizes:
        "100vw" + (sizesArray.length > 0 ? ", " : "") + sizesArray.join(", "),
      placeholderUrl: "",
      width: src.width,
      height: src.height,
      name: src.name,
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
