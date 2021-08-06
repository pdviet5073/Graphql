import gql from "graphql-tag";
import authorInfo from "./author.fragment";

export const getBookById = gql`
  query getBookById($id: ID!) {
    book(id: $id) {
      name
      genre
      author {
        ...authorInfo
      }
    }
  }
  ${authorInfo}
`;

export const getBooks = gql`
  query getBooks($page: Int, $limit: Int, $searchKey: String) {
    books(page: $page, limit: $limit, searchKey: $searchKey) {
      books {
        id
        name
        genre
        author {
          id
          name
        }
      }
      totalPages
      totalItem
      currentPage
    }
  }
`;

export default {
  getBooks,
  getBookById,
};
