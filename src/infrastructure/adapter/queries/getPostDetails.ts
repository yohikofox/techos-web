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
            }
          }
        }
        post_stat_list {
          data {
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