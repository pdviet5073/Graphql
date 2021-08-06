import { MutationTree } from "vuex";
import { AuthorState } from "~/models";
import { authorType } from "~/types";

export const mutation: MutationTree<AuthorState> = {
  setAuthorData(state: AuthorState, payload: authorType[]) {
    state.authorsData = payload;
  },

  createAuthor(state: AuthorState, payload: authorType) {
    state.author = payload;
    state.authorsData.push(payload);
  },
};

export default mutation;
