import { bookType } from "@/types";

export interface authorType {
  id?: string;
  name: string | null;
  age: Number | null;
}

export interface authorDetailType extends authorType {
  books: Partial<bookType>[] | null;
}
