import { PostDetailsRequest, PostDetailsResult } from "@app/getPostDetails";
import ImageSet from "@domain/image";
import Post from "@domain/post";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";

import Hero from "@/app/(main)/components/Hero";
import Layout, { SlotNames } from "@/app/(main)/components/MainLayout";
import PostDetails from "@/app/(main)/components/PostDetails";

export interface PostPageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PostPageProps) {
  const useCase = await UseCaseFactory.Instance.getUseCase<
    PostDetailsRequest,
    Post,
    PostDetailsResult
  >(UseCaseOption.GET_POST_DETAILS);

  const response = await useCase?.execute({ slug: { eq: slug } });

  if (response.IsError) {
    console.error("🚀 ~ Post ~ response:", response.Result);
    redirect("/error/400");
  }

  return (
    <Layout>
      <Layout.Slot name={SlotNames.HERO}>
        <Hero
          title={response.Value.title}
          background={response.Value.picture as ImageSet}
        />
      </Layout.Slot>
      <main>
        <PostDetails post={response.Value} />
      </main>
    </Layout>
  );
}
