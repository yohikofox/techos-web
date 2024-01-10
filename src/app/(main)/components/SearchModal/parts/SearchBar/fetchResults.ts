import SearchData from "R/src/business/model/searchData"
import CacheConstants from "R/src/lib/constants/cache"
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag"

const fetchResults = async (query: string): Promise<SearchData> => {

  const q = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/search?payload=${query}`

  try {

    const response = await fetch(q, {
      next: {
        revalidate: CacheConstants.ONE_MINUTE,
        tags: [
          RevalidateTagConstants.SEARCH
        ]
      }
    })



    if (!response.ok) {
      console.error(
        `Error fetching search results for query ${query}`,
        response.statusText,
        response.status
      )
    }

    const results = (await response.json()) satisfies SearchData

    return results
  } catch (e) {
    console.error('SearchBar: ', e)
  }

  return {
    hits: []
  }
}


export default fetchResults