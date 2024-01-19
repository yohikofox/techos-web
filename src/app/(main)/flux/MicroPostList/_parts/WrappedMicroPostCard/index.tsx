import MicroPost from "R/src/business/model/microPost";
import UseCaseFactory, { UseCaseOption } from "R/src/business/useCaseFactory";
import { MicroPostDetailsResult } from "R/src/business/useCases/getMicroPostDetails";
import MicroPostCard from "../MicroPostCard";

export default async function Wrapper({ slug }: { slug: string }) {
  const useCase = await UseCaseFactory.Instance.getUseCase<any, MicroPost, MicroPostDetailsResult>(UseCaseOption.GET_MICRO_POST_DETAILS);

  const response = await useCase?.execute({ slug: { "eq": slug } });

  if (response.IsError) {
    console.log('response:', response)
    return
  }

  return (
    <>
      {response.Value && (
        <MicroPostCard post={response.Value} />
      )}
    </>
  )
}