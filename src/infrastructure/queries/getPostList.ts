export const getPostList = `
query postList($index: Int!, $limit: Int!) {
  posts(sort: "start_at:desc", pagination: { start: $index, limit: $limit }) {
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
              alternativeText
              caption
              size
              mime
              formats
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