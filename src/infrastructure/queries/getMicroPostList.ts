export const getMicroPostList = `
query getMicroPosts {
  microPosts {
    data {
      attributes {
        title
        slug
        content
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
              background_color
              color
              slug
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