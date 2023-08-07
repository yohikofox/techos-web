import PostCard from "../PostCard"
import styles from "./post-list.module.scss"
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { PostListRequest, PostListResult } from "@/business/useCases/getPostList";
import PostList from "@/business/model/postList";
import { redirect } from "next/navigation";
import Pagination from "./parts/Pagination";

const DEFAULT_PAGE_SIZE = 3 * 5;
const DEFAULT_PAGE_INDEX = 0;

export interface PostListProps {
  title?: string
  page?: number
}

export default async function PostListRender({ title, page }: PostListProps) {
  const validatedPage = page && page > 0 ? page - 1 : DEFAULT_PAGE_INDEX

  const postListUseCase = await UseCaseFactory.Instance.get<PostListRequest, PostList, PostListResult>(UseCaseOption.GET_POST_LIST);
  const postListResponse = await postListUseCase?.execute({ index: validatedPage * DEFAULT_PAGE_SIZE, limit: DEFAULT_PAGE_SIZE });

  if (postListResponse.IsError) {
    redirect('/error/400')
  }

  const posts = postListResponse.Value.posts;

  return (
    <section className={styles.container}>
      {/* <h2>{title}</h2> */}
      {posts.map((post, index) => (
        <PostCard key={`post-list-item-${index}`} post={post} />
      ))}
      <Pagination {...postListResponse.Value.meta.pagination} />
    </section>
  )
}