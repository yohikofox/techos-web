import { gql } from "graphql-request";

export const picture = gql`
data {
  id
  attributes {
    hash
    ext
    previewUrl
    provider
    provider_metadata
    name
    url
    width
    height
    alternativeText
    caption
    size
    mime
    formats
    updatedAt
    createdAt
  }
}
`;
