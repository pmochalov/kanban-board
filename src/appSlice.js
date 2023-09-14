import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        title: 'Сделать'
    },
    {
        id: 2,
        title: 'В процессе'
    },
    {
        id: 3,
        title: 'Сделано'
    }    
]

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        },
        remove: (state, action) => {
            const id = action.payload;
            return state.filter(todo => todo.id !== id);
        }
    }
});

export const { add, remove } = categoriesSlice.actions;
export default categoriesSlice.reducer;