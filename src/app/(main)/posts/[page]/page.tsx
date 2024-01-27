import { HomeDataResult } from "@app/getHomeData";
import Home from "@domain/home";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from 'next/navigation'

import Hero from "@/app/(main)/components/Hero";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import PostCardList from "@/app/(main)/components/PostList";

export interface PageProps {
  params: {
    page: string
  }
  searchParams: {
    page: string
  }
}

async function Page({ params, searchParams }: PageProps) {
  const { page } = params;

  const { ...query } = searchParams

  let pageInt = 0;
  if (page) {
    pageInt = parseInt(page) || 0;
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<any, Home, HomeDataResult>(UseCaseOption.GET_HOME_DATA);
  const response = await useCase?.execute();

  if (response.IsError) {
    console.error('Error:', response)
    redirect('/error/400')
  }

  return (
    <>
      <Layout>
        {!query && (
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
        )}
        <main>
          <PostCardList title="Derniers articles" page={pageInt} query={query} />
        </main>
      </Layout>
    </>
  )
}

export default Page;