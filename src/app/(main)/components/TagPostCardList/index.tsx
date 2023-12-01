
import styles from "./tag-post-list.module.scss"
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import PostList from "@/business/model/postList";
import { redirect } from "next/navigation";
import { PostType } from "@/business/model/post";
import Pagination from "../PostList/parts/Pagination";
import { TagPostListRequest, TagPostListResult } from "@/business/useCases/getTagPostList";
import Container from "@/infrastructure/dependencyFactory";
import { DependencyKeys } from "@/infrastructure/dependencies";
import { IConfigManager } from "@/infrastructure/adapter/configManager";
import PostCard from "../PostCard";

const ADS_POSITION_LIST: number[] = [];
const DEFAULT_PAGE_SIZE = 3 * 5 - ADS_POSITION_LIST.length;
const DEFAULT_PAGE_INDEX = 0;

const AD_DEFAULT = {
  id: -1,
  title: 'Ads',
  description: 'Ads',
  content: 'Ads',
  type: PostType.Ad,
  picture: {
    name: 'Ads',
    src: '/uploads/ads_9ee4df27b1.png',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
}

export interface TagPostListProps {
  tag: string
  title?: string
  page?: number
}

export default async function PostListRender({ title, page, tag }: TagPostListProps) {
  const validatedPage = page && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX
  const index = validatedPage * DEFAULT_PAGE_SIZE
  const limit = DEFAULT_PAGE_SIZE
  const postListUseCase = await UseCaseFactory.Instance.getUseCase<TagPostListRequest, PostList, TagPostListResult>(UseCaseOption.GET_TAG_POST_LIST);

  const postListResponse = await postListUseCase?.execute({
    index, limit, tag: {
      "eq": tag
    }
  });

  if (postListResponse.IsError) {
    redirect('/error/400')
  }
  const configManager = await Container.Instance.resolve<IConfigManager>(DependencyKeys.helper_configmanager)

  AD_DEFAULT.picture.src = `${await configManager.get('CMS_ENDPOINT')}${AD_DEFAULT.picture.src}}`

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
    <section className={styles.container}>
      {posts.map((post, index) => {
        return (
          <PostCard key={`post-list-item-${index}`} post={post} index={index} />
        )
      })}
      <Pagination {...postListResponse.Value.meta.pagination} />
    </section>
  )
}