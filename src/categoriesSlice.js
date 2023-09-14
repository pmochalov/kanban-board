import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        title: 'Сделать',
        theme: 'warning'
    },
    {
        id: 2,
        title: 'В процессе',
        theme: 'primary'
    },
    {
        id: 3,
        title: 'Сделано',
        theme: 'success'
    },
    {
        id: 4,
        title: 'В архиве',
        theme: 'dark'
    }, 
    {
        id: 5,
        title: 'Сделать',
        theme: 'warning'
    },
    {
        id: 6,
        title: 'В процессе',
        theme: 'primary'
    },
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