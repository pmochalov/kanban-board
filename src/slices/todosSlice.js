import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

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

// const incrementBy = createAction('incrementBy')
// const decrement = createAction('decrement')

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
            state.data.splice(index, 1, { ...state.data[index], ...obj });
        },
        remove: (state, action) => {
            const id = action.payload;
            const index = state.data.findIndex(todo => todo.id === id);
            state.data.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'successful';
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.status = 'failed';
            })
    }
});

export const { add, update, remove } = todosSlice.actions;
export default todosSlice.reducer;