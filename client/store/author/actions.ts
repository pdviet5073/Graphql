import { ActionTree } from "vuex";
import { AuthorState, RootState } from "@/models";
import { authorType } from "~/types";

export const action: ActionTree<AuthorState, RootState> = {
  setAuthorData({ commit }, payload: authorType[]) {
    commit("setAuthorData", payload);
  },

  createAuthor({ commit }, payload: authorType) {
    commit("createAuthor", payload);
  },
};

export default action;
