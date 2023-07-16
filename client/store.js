import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./Pages/bookSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
