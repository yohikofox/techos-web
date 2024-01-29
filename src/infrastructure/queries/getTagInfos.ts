export const getTagInfos = `
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
                alternativeText
                caption
                size
                mime
                formats
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
