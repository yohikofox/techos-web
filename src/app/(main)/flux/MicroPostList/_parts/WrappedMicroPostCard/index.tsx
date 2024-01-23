import MicroPost from "@domain/microPost";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { MicroPostDetailsResult } from "@app/getMicroPostDetails";
import MicroPostCard, { PostClassNames } from "../MicroPostCard";

export interface WrappedMicroPostCardProps { slug: string, className?: PostClassNames }


export default async function Wrapper({ slug, className }: WrappedMicroPostCardProps) {
  const useCase = await UseCaseFactory.Instance.getUseCase<any, MicroPost, MicroPostDetailsResult>(UseCaseOption.GET_MICRO_POST_DETAILS);

  const response = await useCase?.execute({ slug: { "eq": slug } });

  if (response.IsError) {
    console.log('response:', response)
    return
  }

  return (
    <>
      {response.Value && (
        <MicroPostCard post={response.Value} className={className} />
      )}
    </>
  )
}