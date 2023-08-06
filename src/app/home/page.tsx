import HomeData from "@/business/model/homeData";
import PostList from "@/business/model/postList";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { HomeDataResult } from "@/business/useCases/getHomeData";
import { PostListResult } from "@/business/useCases/getPostList";
import Hero from "@/components/Hero";
import Layout, { SlotNames } from "@/components/MainLayout";
import PostCardList from "@/components/PostList";
import { redirect } from 'next/navigation'

async function Page() {

  const useCase = await UseCaseFactory.Instance.get<any, HomeData, HomeDataResult>(UseCaseOption.GET_HOME_DATA);
  const postListUseCase = await UseCaseFactory.Instance.get<any, PostList, PostListResult>(UseCaseOption.GET_POST_LIST);

  const response = await useCase?.execute();
  const postListResponse = await postListUseCase?.execute();

  if (response.IsError || postListResponse.IsError) {
    redirect('/error/400')
  }

  return (
    <>
      <Layout>
        <Layout.Slot name={SlotNames.HERO}>
          {response.Value.hero && (
            <Hero
              title={response.Value.hero.title}
              background={response.Value.hero.background}
              content={response.Value.hero.content}
              picture={response.Value.hero.picture}
            />
          )}
        </Layout.Slot>
        <main>
          <PostCardList posts={postListResponse.Value.posts} title="Derniers articles" />
        </main>
      </Layout>
    </>
  )
}

export default Page;