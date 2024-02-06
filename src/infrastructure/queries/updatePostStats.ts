export const updatePostStats = `
mutation updatePostStats ($id:ID!, $count: Int!){
  updatePostStatList(id:$id,data: {view_count: $count}) {
    data {
      id
      attributes {
        view_count
      }
    }
  }
}`;
