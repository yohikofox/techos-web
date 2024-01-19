import { redirect } from "next/navigation";
import MicroPostDetails from "./_parts/MicroPostDetails";
import UseCaseFactory, { UseCaseOption } from "R/src/business/useCaseFactory";
import MicroPost from "R/src/business/model/microPost";
import { MicroPostDetailsResult } from "R/src/business/useCases/getMicroPostDetails";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import Hero from "@/app/(main)/components/Hero";
import ImageSet from "R/src/business/model/image";

export interface MicroPostPageProps { params: { slug: string } }

export default async function Page({ params: { slug } }: MicroPostPageProps) {
  const useCase = await UseCaseFactory.Instance.getUseCase<any, MicroPost, MicroPostDetailsResult>(UseCaseOption.GET_MICRO_POST_DETAILS);

  const response = await useCase?.execute({ slug: { "eq": slug } });

  if (response.IsError) {
    console.log('response:', response)
    redirect('/error/400')
  }

  return (
    <>
      <Layout>
        <Layout.Slot name={SlotNames.HERO}>
          <Hero
            title={response.Value.title}
            background={response.Value.picture as ImageSet}
          />
        </Layout.Slot>
        <main>
          <MicroPostDetails data={response.Value} />
        </main>
      </Layout>
    </>
  )
}