export const createPostStats = `
mutation createPostStats ($count: Int!, $post:ID!){
  createPostStatList(data: {view_count: $count,post:$post}) {
    data {
      attributes {
        view_count
      }
    }
  }
}
  `;
