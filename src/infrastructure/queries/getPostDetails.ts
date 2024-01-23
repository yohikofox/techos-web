export const getPostDetails = `
query postDetails($slug: StringFilterInput!) {
  posts(filters: { slug: $slug }) {
    data {
      id
      attributes {
        author {
          data {
            attributes {
              username
              avatar {
                data {
                  attributes {
                    name
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
        title
        slug
        content
        start_at
        picture {
          data {
            attributes {
              name
              url
              width
              height
            }
          }
        }
        tags {
          data {
            attributes {
              label
              slug
              color
              background_color
            }
          }
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
`