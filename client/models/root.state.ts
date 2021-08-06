import { BookState } from "./book.state";
import { AuthorState } from "./author.state";

export interface RootState {
  book: BookState;
  author: AuthorState;
}
