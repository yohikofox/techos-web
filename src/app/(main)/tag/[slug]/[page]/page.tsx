import Hero from "@/app/(main)/components/Hero";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import TagPostCardList from "@/app/(main)/components/TagPostCardList";
import HomeData from "@/business/model/homeData";
import Tag from "@/business/model/tag";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { HomeDataResult } from "@/business/useCases/getHomeData";
import { TagInfosRequest, TagInfosResult } from "@/business/useCases/getTagInfos";
import { redirect } from 'next/navigation'


export interface PageProps {
  params: {
    slug: string
    page: string
  }
}

async function Page({ params }: PageProps) {
  const { slug, page } = params;

  let pageInt = 0;
  if (page) {
    pageInt = parseInt(page) || 0;
  }

  const useCase = await UseCaseFactory.Instance.getUseCase<any, HomeData, HomeDataResult>(UseCaseOption.GET_HOME_DATA);
  const getTagInfosUseCase = await UseCaseFactory.Instance.getUseCase<TagInfosRequest, Tag, TagInfosResult>(UseCaseOption.GET_TAG_INFOS);

  const response = await useCase?.execute();

  const tagInfosResponse = await getTagInfosUseCase?.execute({
    slug: {
      "eq": slug
    }
  })

  if (response.IsError || tagInfosResponse.IsError) {
    console.error('response.Error:', response, tagInfosResponse)
    redirect('/error/400')
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
          <TagPostCardList title="Derniers articles" page={pageInt} tag={slug} />
        </main>
      </Layout>
    </>
  )
}

export default Page;