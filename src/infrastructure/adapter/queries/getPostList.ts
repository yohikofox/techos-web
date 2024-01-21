export const getPostList = `
query postList($index: Int!, $limit: Int!) {
  posts(sort: "start_at:desc", pagination: { start: $index, limit: $limit }) {
    data {
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
          data {
            attributes {
              label
              background_color
              color
              slug
              hero {
                title
              }
            }
          }
        }
        title
        slug
        content
        extract
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
        post_stat_list {
          data {
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
  `