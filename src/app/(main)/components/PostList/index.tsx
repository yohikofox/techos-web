import PostCard from "../PostCard"
import styles from "./post-list.module.scss"
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { PostListRequest, PostListResult } from "@/business/useCases/getPostList";
import PostList from "@/business/model/postList";
import { redirect } from "next/navigation";
import Pagination from "./parts/Pagination";
import { PostType } from "@/business/model/post";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import TextToSpeechInfos from "../TextToSpeechInfos";
import { IOC } from "R/src/infrastructure/container";


const ADS_POSITION_LIST: number[] = []; //3, 13
const DEFAULT_PAGE_SIZE = 3 * 4 - ADS_POSITION_LIST.length;
const DEFAULT_PAGE_INDEX = 0;

const AD_DEFAULT = {
  id: -1,
  title: 'Ads',
  description: 'Ads',
  content: 'Ads',
  type: PostType.Ad,
  picture: {
    name: 'Ads',
    src: 'http://localhost:1337/uploads/ads_9ee4df27b1.png',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

export interface PostListProps {
  title?: string
  page?: number
}

export default async function PostListRender({ title, page }: PostListProps) {
  const validatedPage = page && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX
  const index = validatedPage * DEFAULT_PAGE_SIZE
  const limit = DEFAULT_PAGE_SIZE
  const postListUseCase = await UseCaseFactory.Instance.getUseCase<PostListRequest, PostList, PostListResult>(UseCaseOption.GET_POST_LIST);
  const postListResponse = await postListUseCase?.execute({ index, limit });

  if (postListResponse.IsError) {
    redirect('/error/400')
  }
  const configManager = await IOC().resolve<IConfigManager>('ConfigManager')

  const src = AD_DEFAULT.picture.src;
  AD_DEFAULT.picture.src = `${await configManager.get('CMS_ENDPOINT')}${src}}`

  const posts = [];
  let insertedAdCount = 0;
  const slimit = postListResponse.Value.posts.length + ADS_POSITION_LIST.length
  for (let i = 0; i < slimit; i++) {
    if (ADS_POSITION_LIST.includes(i)) {
      posts.push(AD_DEFAULT);
      insertedAdCount++;
    }

    if (!postListResponse.Value.posts[i]) continue

    const p = postListResponse.Value.posts[i];
    posts.push(p);
  }

  return (
    <>
      <TextToSpeechInfos />
      <section className={styles.container}>
        {posts.map((post, index) => {
          return (
            <PostCard key={`post-list-item-${index}`} post={post} index={index} />
          )
        })}
        <Pagination {...postListResponse.Value.meta.pagination} />
      </section>
    </>
  )
}