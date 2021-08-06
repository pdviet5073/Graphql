import { MutationTree } from "vuex";
import { BookState } from "@/models/book.state";
import { bookDetailType, bookDataType } from "@/types";

export const mutations: MutationTree<BookState> = {
  setBooksData(state: BookState, payload: bookDataType): void {
    state.booksData = payload;
  },

  setBook(state: BookState, payload: Partial<bookDetailType>): void {
    state.bookDetail = payload;
  },

  createBook(state: BookState, payload: bookDetailType): void {
    state.book = payload;
    state.booksData.books.push(payload);
  },

  deleteBook(state: BookState, payload: bookDetailType) {
    const index = state.booksData.books.findIndex((book) => book.id === payload.id);
    state.booksData.books.splice(index, 1);
  },

  updateBook(state: BookState, payload: bookDetailType) {
    const index = state.booksData.books.findIndex((book) => book.id === payload.id);

    index !== -1 && state.booksData.books.splice(index, 1, payload);
  },
};

export default mutations;
