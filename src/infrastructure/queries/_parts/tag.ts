import { gql } from "graphql-request";

export const tag = gql`
data {
  id
  attributes {
    label
    background_color
    color
    slug
    createdAt
    updatedAt
    publishedAt
  }
}
`;
