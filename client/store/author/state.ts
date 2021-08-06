import { AuthorState } from "@/models/author.state";

export const initState = (): AuthorState => ({
  authorsData: [],
  author: null,
});

export default initState;
