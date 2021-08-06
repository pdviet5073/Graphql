import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type BookPage {
    books: [Book]
    totalPages: Int
    totalItem: Int
    currentPage: Int
  }

  # Root TYPE
  type Query {
    books(page: Int, limit: Int, searchKey: String): BookPage

    book(id: ID!): Book

    authors: [Author]

    author(id: ID!): Author
  }

  #MUTATION
  type Mutation {
    createBook(name: String, genre: String, authorId: ID!): Book

    createAuthor(name: String, age: Int): Author

    deleteBook(id: ID!): Book

    deleteAuthor(id: ID!): Author

    editBook(id: ID!, name: String, genre: String, authorId: ID): Book

    editAuthor(name: String, age: Int): Author
  }
`;

export default typeDefs;
