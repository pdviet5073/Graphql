import gql from "graphql-tag";

export const createBook = gql`
  mutation createBook($name: String, $genre: String, $authorId: ID!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
        }
      }
    }
  }
`;

export const deleteBookMutation = gql`
  mutation deleteBookMutation($id: ID!) {
    deleteBook(id: $id) {
      id
      name
      genre
    }
  }
`;

export const updateBookMutation = gql`
  mutation updateBookMutation($id: ID!, $name: String, $genre: String, $authorId: ID!) {
    editBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export default { createBook, deleteBookMutation };
