import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import HomeData from "@/business/model/homeData";
import { HomeDataResult } from "@/business/useCases/getHomeData";
import Hero from "@/components/Hero";
import Layout, { SlotNames } from "@/components/MainLayout";
import PostCardList from "@/components/PostList";
import { redirect } from 'next/navigation'
import { MouseEventHandler } from "react";



export interface PageProps {
  params: {
    page: string
  }
  searchParams: {
    page: string
  }
}

async function Page({ params, searchParams }: PageProps) {
  const { page } = searchParams;

  let pageInt = 0;
  if (page) {
    pageInt = parseInt(page) || 0;
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<any, HomeData, HomeDataResult>(UseCaseOption.GET_HOME_DATA);
  const response = await useCase?.execute();

  if (response.IsError) {
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
          <PostCardList title="Derniers articles" page={pageInt} />
        </main>
      </Layout>
    </>
  )
}

export default Page;