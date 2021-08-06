import { authorType } from "@/types";

export interface AuthorState {
  authorsData: authorType[];
  author: authorType | null;
}
