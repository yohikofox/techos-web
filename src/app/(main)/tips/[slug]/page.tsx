import {
  GetMicroPostDetailsRequest,
  MicroPostDetailsResult,
} from "@app/getMicroPostDetails";
import ImageSet from "@domain/image";
import MicroPost from "@domain/microPost";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";

import Hero from "@/app/(main)/components/Hero";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";

import MicroPostDetails from "./_parts/MicroPostDetails";

export interface MicroPostPageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: MicroPostPageProps) {
  const useCase = await UseCaseFactory.Instance.getUseCase<
    GetMicroPostDetailsRequest,
    MicroPost,
    MicroPostDetailsResult
  >(UseCaseOption.GET_MICRO_POST_DETAILS);

  const response = await useCase?.execute({ slug: { eq: slug } });

  if (response.IsError) {
    console.log("response:", response);
    redirect("/error/400");
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
  );
}
