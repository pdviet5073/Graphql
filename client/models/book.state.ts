import { bookDetailType, bookDataType } from "@/types";

export interface BookState {
  booksData: bookDataType;
  bookDetail: Partial<bookDetailType> | null;
  book: bookDetailType | null;
  bookUpdate: bookDetailType | null;
}
