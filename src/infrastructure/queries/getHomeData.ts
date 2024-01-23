export const getHomeData = `
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
    }

  `;