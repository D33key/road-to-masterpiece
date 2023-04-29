import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IPost } from "../../types";
import { AddPost } from "./../../types/index";

interface InitialState {
    posts: IPost[];
    status: string | null;
    error: unknown | null;
}
interface ApiError {
    message: string;
    error: string;
}

function isApiError(x: unknown): x is ApiError {
    if (x && typeof x === "object" && "message" in x) {
        return true;
    } else return false;
}

const initialState: InitialState = {
    posts: [],
    status: null,
    error: null,
};

export const fetchPost = createAsyncThunk(
    "posts/fetchPost",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/posts");
            if (!response.ok) throw new Error("Server Error!");
            const data = await response.json();
            return [...data];
        } catch (error) {
            if (isApiError(error)) return rejectWithValue(error.message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<AddPost>) {
            state.posts.push({
                id: nanoid(),
                title: action.payload.title,
                description: action.payload.description,
                date: new Date(),
            });
        },
        removePost(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = "succeded";
                state.posts = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { reducer: postReducer, actions: postActions } = postSlice;
