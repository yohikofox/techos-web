import { gql } from "graphql-request";

import { picture } from "./_parts/picture";

export const getHomeData = gql`
  query {
    homePage {
      data {
        attributes {
          hero {
            title
            content
            background {
              ${picture}
            }
            picture {
              ${picture}
            }
          }
        }
      }
    }
  }
`;
