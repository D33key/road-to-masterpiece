import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
});

export const { reducer: postReducer, actions: postActions } = postSlice;
