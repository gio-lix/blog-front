import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {postReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";
import {categoriesReducer} from "./slices/ccategories";
import {commentsReducers} from "./slices/comments";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        comments: commentsReducers,
        categories: categoriesReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector