import { createSlice } from "@reduxjs/toolkit";
import { getBookItem, getBookItemById } from "./bookActions";

export const bookItemSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    listById: {},
    loading: true,
    selectData: {},
    pageParams: {
      page: 1,
      page_size: 10,
      no_of_pages: 0,
    },
  },
  reducers: {
    changeParams: (state, action) => {
      state.pageParams = action.payload;
    },
    addItemsarray: (state, action) => {
      let { id, title, price } = action.payload;
      state.selectData[id] = { id, count: 1, title, price };
    },
    Increment: (state, action) => {
      let id = action.payload;
      state.selectData[id].count += 1;
    },
    Decrement: (state, action) => {
      let id = action.payload;
      state.selectData[id].count -= 1;
      if (state.selectData[id].count == 0) {
        delete state.selectData[id];
      }
    },
    RemoveItem: (state, action) => {
      let id = action.payload;
      delete state.selectData[id];
    },

    clearData: (state, action) => {
      state.selectData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookItem.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getBookItem.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.status = "succeeded";
        state.loading = false;
        state.list = response.data;
      })
      .addCase(getBookItem.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      })

      .addCase(getBookItemById.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getBookItemById.fulfilled, (state, action) => {
        const { response } = action.payload;
        state.status = "succeeded";
        state.loading = false;
        state.listById = response.data;
      })
      .addCase(getBookItemById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  changeParams,
  addItemsarray,
  Decrement,
  Increment,
  RemoveItem,
  clearData,
} = bookItemSlice.actions;

export default bookItemSlice.reducer;
