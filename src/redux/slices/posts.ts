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
    },
    search: ""
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


export const fetchAllPosts: any = createAsyncThunk<Object,DataState>(
    "posts/fetchAllPosts",
    async (skip,thunkAPI) => {
        const {page, categoryParams, tag, search}: any = skip

        console.log("toolkit - ",  {page, categoryParams, tag, search})

        try {
            const {data} = await axios.get(`/posts?skip=${page}&category=${categoryParams}&search=${search}&tag=${tag}`)
            if (!data.data.length) {
                return;
            }
            console.log("data = > ", data)
            return data.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })



const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        categoryReducer(state: typeof initialState, action) {
            state.posts.items = []
        },
        searchReducer(state: typeof initialState, action) {
            state.search = action.payload
        }
    },
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

        [fetchAllPosts.pending]: (state) => {
            console.log("fetching")
            state.posts.status = "loading"
        },
        [fetchAllPosts.fulfilled]: (state, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            if (action.payload === undefined) {
                state.posts.status = "loaded"
                return
            }
            state.posts.items = [...state.posts.items,...action.payload]
            state.posts.status = "loaded"
        },
        [fetchAllPosts.rejected]: (state) => {
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
export const {categoryReducer, searchReducer} = postSlice.actions
export const postReducer = postSlice.reducer