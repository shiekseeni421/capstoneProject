import { configureStore } from "@reduxjs/toolkit";
import bookItemSlice from "./booksItem/bookItemSlice";

export default configureStore({
  reducer: {
    books: bookItemSlice,
  },
});
