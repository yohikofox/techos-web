import { SearchMicroPostResponse } from "@dto/searchMicroPost.dto";

import SearchEngineRepository from "./baseSearchEngineRepository";

export default class MicroPostSearchRepository extends SearchEngineRepository<SearchMicroPostResponse> {}
