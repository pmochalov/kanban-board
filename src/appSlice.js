import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: 'Канбан'
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        update: (state, action) => {
            return {...state, ...action.payload}
        }
    }
});

export const { update } = appSlice.actions;
export default appSlice.reducer;