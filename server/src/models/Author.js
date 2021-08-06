import mongoose from "mongoose"

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  name: String,
  age: Number
})

export default mongoose.model("authors", AuthorSchema)