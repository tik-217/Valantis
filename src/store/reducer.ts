// reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// initialState
import initialState from "./initialState";

// types
import { IItemsResponse } from "../types";

export const goodsSlice = createSlice({
  name: "goodsSlice",
  initialState,
  reducers: {
    setOffset(state, actions: PayloadAction<number>) {
      state.offset = actions.payload;
    },
    setApiRes(state, actions: PayloadAction<IItemsResponse[]>) {
      state.apiRes = actions.payload;
    },
  },
});

export const { setOffset, setApiRes } = goodsSlice.actions;

export default goodsSlice.reducer;
