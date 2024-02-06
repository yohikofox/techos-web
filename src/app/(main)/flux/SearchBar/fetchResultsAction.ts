import MicroPostList from "@domain/microPostList";
import Search from "@domain/search";
import CacheConstants from "@lib/constants/cache";
import RevalidateTagConstants from "@lib/constants/revalidateTag";

const fetchResults = async (query: string): Promise<MicroPostList> => {
  const q = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/search/micro-post?payload=${query}&index=micro-post`;

  console.log("🚀 ~ fetchResults ~ q:", q);

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

    const results = (await response.json()) satisfies Search;

    return results;
  } catch (e) {
    console.error("SearchBar: ", e);
  }

  //TODO: return a default search object
  return {
    meta: {
      pagination: {
        page: 0,
        pageCount: 0,
        pathPrefix: "",
        pageSize: 0,
        total: 0,
      },
    },
    posts: [],
  };
};

export default fetchResults;
