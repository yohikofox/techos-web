export const getOfflinePageData = `
query getOfflinePageData {
  offlinePage {
    data {
      attributes {
        title
        content
      }
    }
  }
}
`