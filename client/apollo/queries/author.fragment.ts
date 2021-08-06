import gql from "graphql-tag";

export default gql`
  fragment authorInfo on Author {
    name
    age
    books {
      name
    }
  }
`;
