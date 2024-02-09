import {
  GetMicroPostDetailsRequest,
  MicroPostDetailsResult,
} from "@app/getMicroPostDetails";
import MicroPost from "@domain/microPost";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";

import MicroPostCard, { PostClassNames } from "../MicroPostCard";

export interface WrappedMicroPostCardProps {
  slug: string;
  className?: PostClassNames;
}

export default async function Wrapper({
  slug,
  className,
}: WrappedMicroPostCardProps) {
  const useCase = await UseCaseFactory.Instance.getUseCase<
    GetMicroPostDetailsRequest,
    MicroPost,
    MicroPostDetailsResult
  >(UseCaseOption.GET_MICRO_POST_DETAILS);

  const response = await useCase?.execute({ slug: { eq: slug } });

  if (response.IsError) {
    console.error(
      "WrappedMicroPostList error",
      JSON.stringify(response.Result)
    );
    return;
  }

  return <MicroPostCard post={response.Value} className={className} />;
}
