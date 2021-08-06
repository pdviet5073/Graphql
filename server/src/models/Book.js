import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export default mongoose.model("books", BookSchema);
