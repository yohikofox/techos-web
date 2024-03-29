import {
  OnLoadingComplete,
  PlaceholderValue,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";
import NextImage, { ImageLoader } from "next/image";

import toDataURL from "@/lib/image/toDataUrl";

type defaultOptionsType = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> & {
  src: string | StaticImport;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
  loader?: ImageLoader | undefined;
  quality?: number | `${number}` | undefined;
  priority?: boolean | undefined;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  onLoadingComplete?: OnLoadingComplete | undefined;
  layout?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  lazyBoundary?: string | undefined;
  lazyRoot?: string | undefined;
} & React.RefAttributes<HTMLImageElement | null>;

export type ImageOptions = {
  priority?: boolean;
  preset?: string;
} & defaultOptionsType;

const handleBlur = async (options: ImageOptions) => {
  if (options.placeholder === "blur" && options.blurDataURL !== undefined) {
    return await toDataURL(options.blurDataURL);
  }
  return options.blurDataURL;
};

export default async function ServerImage(options: ImageOptions) {
  const localOptions: ImageOptions = {
    ...options,
    blurDataURL: await handleBlur(options),
    draggable: options.draggable !== undefined ? options.draggable : false,
  };

  return <NextImage {...localOptions} />;
}

export function Image(options: ImageOptions) {
  const localOptions: ImageOptions = {
    ...options,
  };

  if (options.fill !== undefined && options.sizes === undefined) {
    localOptions.sizes = "100%";
  }

  return <NextImage {...localOptions} />;
}
