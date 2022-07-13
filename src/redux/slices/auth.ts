import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataState, UserState} from "../../types/type";
import axios from "../../axios";
import {ActionReturnType} from "../type";
import {RootState} from "../store";




const initialState = {
    status: "loading",
    data: null as UserState | null
}




export const fetchUserData: any = createAsyncThunk<Object,DataState>(
    "auth/fetchUserData",
    async (params,thunkAPI) => {
        try {
            const {data} = await axios.post("/auth/login", params)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

export const fetchAuthMe: any = createAsyncThunk<Object,UserState>(
    "auth/fetchAuthMe",
    async (params,thunkAPI) => {
        try {
            const {data} = await axios.get("/auth/me")
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })


export const fetchRegister: any = createAsyncThunk<Object,DataState>(
    "auth/fetchRegister",
    async (params,thunkAPI) => {
        try {
            const {data} = await axios.post("/auth/register", params)
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    })

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = "loading"
        },
        [fetchUserData.fulfilled]: (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchUserData.rejected]: (state) => {
            state.status = "error"
        },


        [fetchAuthMe.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAuthMe.fulfilled]: (state, action: PayloadAction<ActionReturnType<typeof initialState>>) => {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = "error"
        },


        [fetchRegister.pending]: (state) => {
            state.status = "loading"
        },
        [fetchRegister.fulfilled]: (state, action: PayloadAction<any>) => {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchRegister.rejected]: (state) => {
            state.status = "error"
        },
    }
})


export const selectAuth = (state: RootState) => Boolean(state.auth.data)
export const  {logout} = authSlice.actions

export const authReducer = authSlice.reducer
