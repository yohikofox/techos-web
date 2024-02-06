import { gql } from "graphql-request";

import { picture } from "./_parts/picture";

export const getHeaderData = gql`
  query {
    header {
      data {
        attributes {
          placeholder
          search_title
          trainings
        }
      }
    }
    trainings {
      data {
        attributes {
          title
          link
          background {
            ${picture}
          }
        }
      }
    }
  }
`;
