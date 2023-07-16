import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setData(state, action) {
      //Mutates the current state of books
      state.books = action.payload;
    },
    // addBook(state, action) {
    //   state.books.push(action.payload);
    // },
    //The state is already updated with the setData because it gets data from the DB for each dispatch
    deleteBook(state, action) {
      const updatedBooks = state.books.filter(
        (book) => book.id !== action.payload
      );
      state.books = updatedBooks;
    },
  },
});

export const { setData, deleteBook, addBook } = bookSlice.actions;

export default bookSlice.reducer;

export const getBooks = (state) => state.books.books;
