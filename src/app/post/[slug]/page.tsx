import Post from "@/business/model/post";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { PostDetailsResult } from "@/business/useCases/getPostDetails";
import { redirect } from "next/navigation";
import Layout, { SlotNames } from "@/components/MainLayout";
import Hero from "@/components/Hero";
import ImageSet from "@/business/model/image";
import PostDetails from "@/components/PostDetails";

export interface PostPageProps { params: { slug: string } }

export default async function Post({ params: { slug } }: PostPageProps) {

  const useCase = await UseCaseFactory.Instance.get<any, Post, PostDetailsResult>(UseCaseOption.GET_POST_DETAILS);

  const response = await useCase?.execute({ slug: { "eq": slug } });

  if (response.IsError) {
    redirect('/error/400')
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
  )
}