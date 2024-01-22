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
          data {
            attributes {
              label
            }
          }
        }
        picture {
          data {
            attributes {
              name
              url
            }
          }
        }
      }
    }
  }
}
`