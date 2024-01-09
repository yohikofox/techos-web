'use server'

import SearchData from "R/src/business/model/searchData"

const fetchResults = async (query: string): Promise<SearchData | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/search?payload=${query}`)

    if (!response.ok) {
      console.error(
        `Error fetching search results for query ${query}`,
        response.statusText,
        response.status
      )
    }

    const results = await response.json()

    return results
  } catch (e) {
    console.error('SearchBar: ', e)
  }
}


export default fetchResults