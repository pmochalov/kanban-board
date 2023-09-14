import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push(action.payload)
        },
        update: (state, action) => {
            const data = action.payload;
            const id = data.id;
            const obj = data.obj;

            const index = state.findIndex(todo => todo.id === id);
            state.splice(index, 1, { ...state[index], ...obj });
        },
        remove: (state, action) => {
            const id = action.payload;
            return state.filter(todo => todo.id !== id);
        }
    }
});

export const { add, update, remove } = todosSlice.actions;
export default todosSlice.reducer;