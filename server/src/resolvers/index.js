const resolvers = {
  // QUERY
  Query: {
    books: async (root, args, context) => {
      return await context.getAllBook(args);
    },

    book: async (root, { id }, { getBookById }) => await getBookById(id),

    authors: async (root, args, { getAllAuthor }) => await getAllAuthor(),

    author: async (root, { id }, { getAuthorById }) => await getAuthorById(id),
  },

  Book: {
    author: async (root, args, { getAuthorById }) =>
      await getAuthorById(root.authorId),
  },

  Author: {
    books: async ({ id }, args, { getAllBookByAuthor }) =>
      await getAllBookByAuthor({ authorId: id }),
  },

  //MUTATION
  Mutation: {
    createBook: async (root, args, { createBook }) => {
      return await createBook(args);
    },

    createAuthor: async (root, args, { createAuthor }) => {
      return await createAuthor(args);
    },

    deleteBook: async (root, args, { deleteBook }) => {
      return await deleteBook(args);
    },

    editBook: async (root, args, { updateBook }) => {
      return await updateBook(args);
    },
  },
};

export default resolvers;
