import { ActionTree } from "vuex";
import { RootState, BookState } from "@/models";
import { bookDetailType, bookDataType } from "@/types";

export const actions: ActionTree<BookState, RootState> = {
  setBooksData({ commit }, payload: bookDataType[]): void {
    commit("setBooksData", payload);
  },

  setBook({ commit }, payload: Partial<bookDetailType>): void {
    commit("setBook", payload);
  },

  createBook({ commit }, payload: bookDetailType): void {
    commit("createBook", payload);
  },

  deleteBook({ commit }, payload: bookDetailType): void {
    commit("deleteBook", payload);
  },

  updateBook({ commit }, payload: bookDetailType): void {
    commit("updateBook", payload);
  },
};

export default actions;
