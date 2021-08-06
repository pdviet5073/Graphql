import { BookState } from "@/models/book.state";

export const initState = (): BookState => ({
  booksData: {
    books: [],
    totalPages: 0,
    totalItem: 0,
    currentPage: 0,
  },
  bookDetail: null,
  book: null,
  bookUpdate: null,
});

export default initState;
