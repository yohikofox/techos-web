import { picture } from "./_parts/picture";
import { tag } from "./_parts/tag";

export const getPostDetails = `
query postDetails($slug: StringFilterInput!) {
  posts(filters: { slug: $slug }) {
    data {
      id
      attributes {
        author {
          data {
            id
            attributes {
              username
              avatar {
                ${picture}
              }
            }
          }
        }
        title
        slug
        content
        start_at
        picture {
          ${picture}
        }
        tags {
          ${tag}
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
  }
}
`;
