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
  query {
  posts {
    data {
      attributes {        
        author{data{attributes{username}}}
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
  }
}
  `
}
export default queries  