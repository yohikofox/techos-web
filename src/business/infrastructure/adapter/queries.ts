const queries = {
  getHomeData: `
    query {
      homePage {
        data {
          attributes {
            hero {
              title
              content
              background {
                data {
                  attributes {
                    name
                    width
                    height
                    url
                  }
                }
              }
              picture {
                data {
                  attributes {
                    name
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
      }
    }

  `,
  getHeaderData: `
    query{
      header {
        data{attributes{
          placeholder
          search_title
          trainings
        }}
      }
      trainings {data{attributes{
        title
        link
        background {
          data{
            attributes{
              name
              width
              height
              url
            }}}
      }}}
    }
  `,
  getPostList: `
query postList($index: Int!, $limit: Int!) {
  posts(sort: "start_at:desc", pagination: { start: $index, limit: $limit }) {
    data {
      attributes {
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
  `,
  getPostDetails: `
  query postDetails($slug: StringFilterInput!) {
    posts(filters:{slug: $slug}) {
      data {
        attributes {        
          author{data{attributes{username}}}
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
        }
      }
    }
  }
  `,
  getTagPostList: `
query tagPostList($tag: StringFilterInput!, $index: Int!, $limit: Int!) {
  posts(
    filters: { tags: { slug: $tag } }
    sort: "start_at:desc"
    pagination: { start: $index, limit: $limit }
  ) {
    data {
      attributes {
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

  `,
  getTagInfos: `
  query tagInfos($slug: StringFilterInput!) {
  tags(filters: { slug: $slug }) {
    data {
      attributes {
        label
        background_color
        color
        hero {
          title
          background {
            data {
              attributes {
                name
                url
                width
                height
              }
            }
          }
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
        }
      }
    }
  }
}

  `
}
export default queries  