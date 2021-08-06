import Author from "../models/Author.js";

export const getAllAuthor = async () => {
  try {
    return await Author.find();
  } catch (error) {
    console.log(error);
  }
};

export const getAuthorById = async (id) => {
  try {
    return await Author.findById(id);
  } catch (error) {
    console.log(error);
  }
};

export const createAuthor = async (args) => {
  try {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  } catch (error) {
    console.log(error);
  }
};
