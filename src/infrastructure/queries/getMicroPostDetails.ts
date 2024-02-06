import { picture } from "./_parts/picture";
import { tag } from "./_parts/tag";

export const getMicroPostDetails = `
query microPostDetails($slug: StringFilterInput!) {
  microPosts(filters: { slug: $slug }) {
    data {
      id
      attributes {
        title
        slug
        content
        tags {
          ${tag}
        }
        picture {
          ${picture}
        }
      }
    }
  }
}
`;
