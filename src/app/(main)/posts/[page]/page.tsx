import { HomeDataResult } from "@app/getHomeData";
import Home from "@domain/home";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import Layout, { SlotNames } from "@main/components/MainLayout";
import { redirect } from "next/navigation";

import Hero from "../../components/Hero";
import PostList from "../../components/PostList";

export interface PageProps {
  params: {
    page: string;
  };
  searchParams: {
    page: string;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { page } = params;

  const { ...query } = searchParams;

  let pageInt = 0;
  if (page !== undefined) {
    const parsedIntPage = parseInt(page);
    pageInt = parsedIntPage !== undefined ? parsedIntPage : 0;
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<
    void,
    Home,
    HomeDataResult
  >(UseCaseOption.GET_HOME_DATA);

  const response = await useCase?.execute();

  if (response.IsError) {
    console.error("Error:", response);
    redirect("/error/400");
  }

  const doDisplayHero = query === undefined || Object.keys(query).length === 0;

  return (
    <>
      <Layout>
        {doDisplayHero && (
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
          <PostList title="Derniers articles" page={pageInt} query={query} />
        </main>
      </Layout>
    </>
  );
}

export default Page;
