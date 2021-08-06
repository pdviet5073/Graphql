import gql from "graphql-tag";

export const createAuthorMutation = gql`
  mutation createAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export default { createAuthorMutation };
