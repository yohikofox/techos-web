import { picture } from "./_parts/picture";
import { tag } from "./_parts/tag";

export const getPostList = `
query postList($offset: Int!, $limit: Int!) {
  posts(sort: "start_at:desc", pagination: { start: $offset, limit: $limit }) {
    data {
      id
      attributes {
        level
        author {
          data {
            attributes {
              username
            }
          }
        }
        tags {
          ${tag}
        }
        title
        slug
        content
        extract
        start_at
        picture {
          ${picture}
        }
        post_stat_list {
          data {
            id
            attributes {
              view_count
            }
          }
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
