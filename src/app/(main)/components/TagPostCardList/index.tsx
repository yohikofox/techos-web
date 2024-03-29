import { TagPostListRequest, TagPostListResult } from "@app/getTagPostList";
import { PostType } from "@domain/post";
import PostList from "@domain/postList";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

import PostCard from "../PostCard";
import Pagination from "../PostList/parts/Pagination";
import styles from "./tag-post-list.module.scss";

const ADS_POSITION_LIST: number[] = [];
const DEFAULT_PAGE_SIZE = 3 * 5 - ADS_POSITION_LIST.length;
const DEFAULT_PAGE_INDEX = 0;

const AD_DEFAULT = {
  id: "-1",
  title: "Ads",
  description: "Ads",
  content: "Ads",
  type: PostType.Ad,
  picture: {
    name: "Ads",
    src: "/uploads/ads_9ee4df27b1.png",
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export interface TagPostListProps {
  tag: string;
  title?: string;
  page?: number;
}

export default async function PostListRender({ page, tag }: TagPostListProps) {
  const validatedPage =
    page !== undefined && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX;
  const index = validatedPage * DEFAULT_PAGE_SIZE;
  const limit = DEFAULT_PAGE_SIZE;
  const postListUseCase = await UseCaseFactory.Instance.getUseCase<
    TagPostListRequest,
    PostList,
    TagPostListResult
  >(UseCaseOption.GET_TAG_POST_LIST);

  const postListResponse = await postListUseCase?.execute({
    index,
    limit,
    tag: {
      eq: tag,
    },
  });

  if (postListResponse.IsError) {
    redirect("/error/400");
  }
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");

  AD_DEFAULT.picture.src = `${await configManager.get("CMS_ENDPOINT")}${AD_DEFAULT.picture.src}}`;

  const posts = [];
  const slimit = postListResponse.Value.posts.length + ADS_POSITION_LIST.length;
  for (let i = 0; i < slimit; i++) {
    if (ADS_POSITION_LIST.includes(i)) {
      posts.push(AD_DEFAULT);
    }

    if (postListResponse.Value.posts[i] === undefined) continue;

    const p = postListResponse.Value.posts[i];
    posts.push(p);
  }

  return (
    <section className={styles.container}>
      {posts.map((post, index) => {
        return (
          <PostCard key={`post-list-item-${index}`} post={post} index={index} />
        );
      })}
      <Pagination
        {...postListResponse.Value.meta.pagination}
        pathPrefix="posts"
      />
    </section>
  );
}
