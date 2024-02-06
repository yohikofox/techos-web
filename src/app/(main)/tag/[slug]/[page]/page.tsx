import { HomeDataResult } from "@app/getHomeData";
import { TagInfosRequest, TagInfosResult } from "@app/getTagInfos";
import Home from "@domain/home";
import Tag from "@domain/tag";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";

import Hero from "@/app/(main)/components/Hero";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import TagPostCardList from "@/app/(main)/components/TagPostCardList";

export interface PageProps {
  params: {
    slug: string;
    page: string;
  };
}

async function Page({ params }: PageProps) {
  const { slug, page } = params;

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
  const getTagInfosUseCase = await UseCaseFactory.Instance.getUseCase<
    TagInfosRequest,
    Tag,
    TagInfosResult
  >(UseCaseOption.GET_TAG_INFOS);

  const response = await useCase?.execute();

  const tagInfosResponse = await getTagInfosUseCase?.execute({
    slug: {
      eq: slug,
    },
  });

  if (response.IsError || tagInfosResponse.IsError) {
    console.error("response.Error:", response, tagInfosResponse);
    redirect("/error/400");
  }

  return (
    <>
      <Layout>
        <Layout.Slot name={SlotNames.HERO}>
          {tagInfosResponse.Value.hero && (
            <Hero
              title={tagInfosResponse.Value.hero.title}
              background={tagInfosResponse.Value.hero.background}
              content={tagInfosResponse.Value.hero.content}
              picture={tagInfosResponse.Value.hero.picture}
            />
          )}
        </Layout.Slot>
        <main>
          <TagPostCardList
            title="Derniers articles"
            page={pageInt}
            tag={slug}
          />
        </main>
      </Layout>
    </>
  );
}

export default Page;
