export const getHeaderData = `
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
              url
              width
              height
              alternativeText
              caption
              size
              mime
              formats
            }}}
      }}}
    }
  `