export const getPostStats = `
query getPostStats($slug: StringFilterInput!) {
  postStatLists(filters: { post: { slug: $slug } }) {
    data {
      id
      attributes {
        view_count
      }
    }
  }
}

  `