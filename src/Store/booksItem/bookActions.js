import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBookItem = createAsyncThunk("/getBookItem", async (payload) => {
  const { url } = payload;
  // console.log(url, "url");
  try {
    const response = await axios.get(url);
    if (response) {
      return { response };
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error.message;
  }
});

export const getBookItemById = createAsyncThunk(
  "/getBookItemById",
  async (payload) => {
    const { url } = payload;
    // console.log(url, "url");
    try {
      const response = await axios.get(url);
      if (response) {
        return { response };
      } else {
        throw new Error(response);
      }
    } catch (error) {
      throw error.message;
    }
  }
);
