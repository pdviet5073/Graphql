import { bookDataType, bookType, bookDetailType } from "@/types/book";
import author from "./author";

export const book: bookType = {
  id: "book1",
  name: "Chi Pheo",
  genre: "truyen ngan",
  authorId: "author1",
};

export const bookDetail: bookDetailType = {
  id: "book1",
  name: "Chi Pheo",
  genre: "truyen ngan",
  author: { ...author },
};

export const books: bookDataType = {
  books: [
    {
      id: "book2",
      name: "Tat den",
      genre: "truyen",
      author: { ...author },
    },
  ],
  totalPages: 3,
  totalItem: 2,
  currentPage: 1,
};

export default {
  book,
  bookDetail,
  books,
};
