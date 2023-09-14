import { configureStore } from "@reduxjs/toolkit";
import appReductor from './appSlice';
import todosReducer from './todosSlice';
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
    reducer:{
        app: appReductor,
        todos: todosReducer,
        categories: categoriesReducer
    }
})