import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { initialState } from "../data";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`);
        const data = await response.json();
        return data;
    }
);

const initialState = {
    status: 'idle',
    data: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        add: (state, action) => {
            state.data.push(action.payload)
        },
        update: (state, action) => {
            const data = action.payload;
            const id = data.id;
            const obj = data.obj;
            const index = state.data.findIndex(todo => todo.id === id);
            state.data.splice(index, 1, { ...state[index], ...obj });
        },
        remove: (state, action) => {
            const id = action.payload;
            const index = state.data.findIndex(todo => todo.id === id);
            state.data.splice(index, 1);
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'successful';
            state.data = action.payload;
        },
        [fetchTodos.rejected]: (state) => {
            state.status = 'failed';
        }                   
    }
});

export const { add, update, remove } = todosSlice.actions;
export default todosSlice.reducer;