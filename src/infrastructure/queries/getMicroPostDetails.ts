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
              background_color
              color
              slug
            }
          }
        }
        picture {
          data {
            attributes {
              name
              url
              width
              height
              alternativeText
              caption
              size
              mime
              formats
            }
          }
        }
      }
    }
  }
}
`