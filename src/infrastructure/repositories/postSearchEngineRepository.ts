import { SearchPostResponse } from "../dto/searchPost.dto";
import SearchEngineRepository from "./baseSearchEngineRepository";

export default class PostSearchEngineRepository extends SearchEngineRepository<SearchPostResponse> {}
