import Search, { SearchItem } from "../model/search"
import { MicroPostData } from "./dto/micro-post.dto"
import { PostData } from "./dto/post.dto"
import { SearchData } from "./dto/search.dto"
import { IMicroPostService } from "./micro-post.service"
import { IPostService } from "./post.service"

export interface ISearchService {
  mapSearchItem(search: SearchData, indexName: string): Promise<Search>
}

export default class SearchService implements ISearchService {
  constructor(
    private postService: IPostService,
    private microPostService: IMicroPostService,
  ) { }

  async mapSearchItem(search: SearchData, indexName: string): Promise<Search> {
    switch (indexName) {
      case 'post':
        return {
          hits: (await Promise.all(search.hits.map(h => this.postService.mapPost({
            attributes: {
              ...h,
              picture: h.picture && {
                data: {
                  attributes: h.picture
                }
              },
              author: h.author && {
                data: {
                  attributes: h.author
                }
              },
              post_stat_list: h.post_stat_list && {
                data: {
                  attributes: h.post_stat_list
                }
              },
              tags: h.tags && {
                data: h.tags.map((tag: any) => ({
                  attributes: tag
                }))
              }
            }
          })))).filter(h => !!h) as SearchItem[]
        } satisfies Search
      case 'micro-post': {
        return {
          hits: (await Promise.all(search.hits.map(h => this.microPostService.mapMicroPost({
            attributes: {
              ...h,
              picture: h.picture && {
                data: {
                  attributes: h.picture
                }
              }
            }
          })))).filter(h => !!h) as SearchItem[]
        } satisfies Search
      }
      default:
        return {
          hits: []
        } satisfies Search
    }
  }
}