import Search from "@domain/search";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

const fetchResults = async (query: string): Promise<Search> => {
  const q = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/search?payload=${query}&index=post`;

  try {
    const response = await fetch(q, {
      next: {
        revalidate: CacheConstants.ONE_MINUTE,
        tags: [RevalidateTagConstants.SEARCH],
      },
    });

    if (!response.ok) {
      console.error(
        `Error fetching search results for query ${query}`,
        response.statusText,
        response.status
      );
    }

    const results: Search = await response.json();

    return results;
  } catch (e) {
    console.error("SearchBar: ", e);
  }

  return {
    hits: [],
    estimatedTotalHits: 0,
    query: "",
    processingTimeMs: 0,
    limit: 0,
    offset: 0,
  } as Search;
};

export default fetchResults;
