import { GetterTree } from "vuex";
import { RootState, BookState } from "@/models";

export const getters: GetterTree<BookState, RootState> = {
  booksD: (state: BookState) => state.booksData.books,
};

export default getters;
