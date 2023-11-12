import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
    'todos/fetchCategories',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        add: (state, action) => {
            state.data.push(action.payload)
        },
        remove: (state, action) => {
            const id = action.payload;
            return state.data.filter(todo => todo.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'successful';
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const { add, remove } = categoriesSlice.actions;
export default categoriesSlice.reducer;