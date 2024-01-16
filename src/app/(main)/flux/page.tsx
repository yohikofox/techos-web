import UseCaseFactory, { UseCaseOption } from "R/src/business/useCaseFactory";
import MicroPostListComponent from "./MicroPostList";
import MicroPostList from "R/src/business/model/microPostList";
import { MicroPostListResult } from "R/src/business/useCases/getMicroPostList";
import { redirect } from "next/navigation";
import SearchBar from "./SearchBar";

export default async function Page() {

  const useCase = await UseCaseFactory.Instance.getUseCase<any, MicroPostList, MicroPostListResult>(UseCaseOption.GET_MICRO_POST_LIST);

  const response = await useCase?.execute();

  if (response.IsError) {
    console.log(response.Result)
    redirect('/error/400')
  }


  const pageModelResponse = {
    Value: {
      placeholder: 'Search',
    }
  }

  return (
    <>
      <SearchBar placeholder={pageModelResponse?.Value.placeholder} delay={true} />
      <MicroPostListComponent data={response.Value} />
    </>
  )
}