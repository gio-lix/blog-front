import {DataState} from "../../types/type";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../axios";
import {ActionReturnType} from "../type";



const initialState = {
    posts: {
        items: [] as DataState[] ,
        status: "loading"
    },
    tags: {
        items: [] as string[] | [],
        status: "loading"
    }
}


export const fetchPosts: any = createAsyncThunk<Object,DataState>(
    "posts/fetchPosts",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/posts")
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const fetchTags: any = createAsyncThunk<Object,DataState>(
    "posts/fetchTags",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/tags")
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const fetchRemovePosts: any = createAsyncThunk<Object,DataState>(
    "posts/fetchRemovePosts",
    async (id,thunkAPI) => {
        try {
            const data = await axios.delete(`/posts/${id}`)
            return id
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // Fetch posts
        [fetchPosts.pending]: (state) => {
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            state.posts.items = action.payload
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = "error"
        },

        // Fetch tags
        [fetchTags.pending]: (state) => {
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = "error"
        },

        // Remove Post
        [fetchRemovePosts.fulfilled]: (state, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.payload)
        },

    }
})

export const postReducer = postSlice.reducer