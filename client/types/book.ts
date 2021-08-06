import { authorDetailType } from "@/types";

export interface bookType {
  id?: string;
  name: string | null;
  genre: string | null;
  authorId?: string | null;
}

export interface bookDetailType extends bookType {
  author: authorDetailType | null;
}

export interface bookDataType {
  books: bookDetailType[];
  totalPages: number;
  totalItem: number;
  currentPage: number;
}
