import { MicroPostListResult } from "@app/getMicroPostList";
import MicroPostList from "@domain/microPostList";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { redirect } from "next/navigation";
import { MicroPostListRequest } from "R/src/application/requests/microPostList.request";
import { IndexNames } from "R/src/interfaces/ISearchRepository";

import MicroPostListComponent from "./MicroPostList";
import SearchBar from "./SearchBar";

export default async function Page() {
  const useCase = await UseCaseFactory.Instance.getUseCase<
    MicroPostListRequest,
    MicroPostList,
    MicroPostListResult
  >(UseCaseOption.GET_MICRO_POST_LIST);

  const response = await useCase?.execute({
    indexName: IndexNames.MICRO_POST,
    limit: 10,
  });

  if (response.IsError) {
    console.error("Flux error", JSON.stringify(response.Result));
    redirect("/error/400");
  }

  const pageModelResponse = {
    Value: {
      placeholder: "Search",
    },
  };

  return (
    <>
      <SearchBar
        placeholder={pageModelResponse?.Value.placeholder}
        delay={true}
      />
      <MicroPostListComponent data={response.Value} />
    </>
  );
}
