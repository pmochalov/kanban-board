import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todosSlice';
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
    reducer:{
        todos: todosReducer,
        categories: categoriesReducer
    }
})