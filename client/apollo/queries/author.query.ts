import gql from "graphql-tag";
import authorInfo from "./author.fragment";

export const getAuthor = gql`
  query getAuthor {
    authors {
      id
      name
      age
    }
  }
`;

export const getAuthorById = gql`
  query getAuthorById($id: ID!) {
    author(id: $id) {
      id
      ...authorInfo
    }
  }
  ${authorInfo}
`;

export default {
  getAuthor,
  getAuthorById,
};
