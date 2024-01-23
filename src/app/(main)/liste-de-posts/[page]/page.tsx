import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { HomeDataResult } from "@app/getHomeData";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import { redirect } from 'next/navigation'

import Hero from "@/app/(main)/components/Hero";
import PostCardList from "@/app/(main)/components/PostList";
import Home from "@domain/home";

export interface PageProps {
  params: {
    page: string
  }
  searchParams: {
    page: string
  }
}

async function Page({ params }: PageProps) {
  const { page } = params;

  let pageInt = 0;
  if (page) {
    pageInt = parseInt(page) || 0;
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<any, Home, HomeDataResult>(UseCaseOption.GET_HOME_DATA);
  const response = await useCase?.execute();

  if (response.IsError) {
    console.error('response.Error:', response)
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