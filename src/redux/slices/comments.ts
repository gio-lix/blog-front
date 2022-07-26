import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentsState} from "../../types/type";
import axios from "../../axios";
import {ActionReturnType} from "../type";


const initialState = {
    allComments: [],
    status: "loading"
}

type State = typeof initialState

export const fetchPostsComments: ReturnType<any> = createAsyncThunk<Object,CommentsState>(
    "comments/fetchPostsComments",
    async (id,thunkAPI) => {
        try {
            const {data} = await axios.get(`/posts/${id}/comment`)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })


export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPostsComments.pending]: (state: State) => {
            state.status = "loading"
        },
        [fetchPostsComments.fulfilled]: (state: State, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            state.allComments = action.payload
            state.status = "loaded"
        },
        [fetchPostsComments.rejected]: (state: State) => {
            state.status = "error"
        },
    }
})

export const commentsReducers = commentsSlice.reducer