import { picture } from "./_parts/picture";
import { tag } from "./_parts/tag";

export const getMicroPostList = `
query getMicroPosts {
  microPosts {
    data {
      id
      attributes {
        title
        slug
        content
        picture {
          ${picture}
        }
        tags {
          ${tag}
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`;
