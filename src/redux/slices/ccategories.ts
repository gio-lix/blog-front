import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    category: ""
}
type State = typeof initialState

export const categoriesSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        category: (state: State, action: any) => {
            state.category = action.payload
        }
    }
})

export const {category} = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer