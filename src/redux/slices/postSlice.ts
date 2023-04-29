import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { EditPost, IPost } from "../../types";
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

export const addNewPost = createAsyncThunk(
    "posts/addNewPost",
    async ({ title, description }: AddPost, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch("http://localhost:3001/posts", {
                method: "POST",
                body: JSON.stringify({
                    id: nanoid(),
                    title,
                    description,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Some problem with adding post!");
            const data = await response.json();
            dispatch(postActions.addPost(data));
        } catch (error) {
            if (isApiError(error)) return rejectWithValue(error.message);
        }
    }
);

export const removePost = createAsyncThunk(
    "posts/removePost",
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok)
                throw new Error("Some problem with removing post!");
            dispatch(postActions.removePost(id));
        } catch (error) {
            if (isApiError(error)) return rejectWithValue(error.message);
        }
    }
);

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (
        { id, description }: { id: string; description: string },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const oldPost = await fetch(`http://localhost:3001/posts/${id}`);
            const oldPostData = await oldPost.json();

            const updatedPost = {
                ...oldPostData,
                description,
            };

            const response = await fetch(`http://localhost:3001/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });
            if (!response.ok)
                throw new Error("Some problem with editing post!");
            dispatch(postActions.editPost({ id, description }));
        } catch (error) {
            if (isApiError(error)) return rejectWithValue(error.message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<IPost>) {
            state.posts.push(action.payload);
        },
        removePost(state, action: PayloadAction<string>) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload
            );
        },
        editPost(state, action: PayloadAction<EditPost>) {
            state.posts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        description: action.payload.description,
                    };
                }
                return post;
            });
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = "succeded";
                state.posts = action.payload ?? [];
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(removePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { reducer: postReducer, actions: postActions } = postSlice;
