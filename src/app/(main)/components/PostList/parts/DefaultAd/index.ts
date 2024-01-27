import { PostType } from "R/src/domain/post"
import { SearchItem } from "R/src/domain/search"
import { IOC } from "R/src/infrastructure/container"
import { IAssetBuilder } from "R/src/infrastructure/helper/assetBuilder"
import dayjs from "dayjs"


export const getDefaultAd = async () => {
  const assetBuilder = await IOC().resolve<IAssetBuilder>('AssetBuilder')

  const AD_DEFAULT: SearchItem = {
    id: "-1",
    title: 'Ads',
    content: 'Ads',
    type: PostType.Ad,
    picture: {
      name: 'Ads',
      src: '/uploads/ads_9ee4df27b1.png',
    },
    author: undefined,
    slug: 'ads',
    start_at: dayjs().toISOString(),
  }

  AD_DEFAULT.picture = {
    ...AD_DEFAULT.picture,
    src: await assetBuilder.buildAssetUri(AD_DEFAULT.picture!.src!)
  }

  return AD_DEFAULT
}
