import PostList from "R/src/domain/postList";
import CacheConstants from "R/src/lib/constants/cache";
import RevalidateTagConstants from "R/src/lib/constants/revalidateTag";

const fetchResults = async (query: string): Promise<PostList> => {
  const q = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/search/post?payload=${query}&index=post`;

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

    const results: PostList = await response.json();

    return results;
  } catch (e) {
    console.error("SearchBar: ", e);
  }

  return {
    posts: [],
    meta: {
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 0,
        pathPrefix: "",
        total: 0,
      },
    },
  } as PostList;
};

export default fetchResults;
