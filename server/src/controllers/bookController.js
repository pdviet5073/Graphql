import Book from "../models/Book.js";

export const getAllBookByAuthor = async (condition = null) => {
  try {
    return await Book.find(condition);
  } catch (error) {
    console.log(error);
  }
};

export const getBookById = async (id) => {
  try {
    return await Book.findById(id);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBook = async (args) => {
  try {
    const { page, limit = 9999999, searchKey } = args;

    const data = await Book.find(searchKey && { name: { $regex: searchKey } })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(
      searchKey && { name: { $regex: searchKey } }
    );

    return {
      books: data,
      totalPages: Math.ceil(count / limit),
      totalItem: count,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createBook = async (args) => {
  try {
    const newBook = new Book(args);
    return await newBook.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = async (args) => {
  try {
    const { id } = args;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      throw error;
    }
    return book;
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (args) => {
  try {
    const { id, ...other } = args;

    return await Book.findByIdAndUpdate(id, other, { new: true });
  } catch (error) {
    console.log(error);
  }
};
