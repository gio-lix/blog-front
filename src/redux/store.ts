import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {postReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";

export const store = configureStore({
    reducer: {
       posts: postReducer,
        auth: authReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector