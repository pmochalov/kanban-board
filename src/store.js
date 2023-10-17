import { configureStore } from "@reduxjs/toolkit";
import appReducer from './slices/appSlice';
import todosReducer from './slices/todosSlice';
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
    reducer:{
        app: appReducer,
        todos: todosReducer,
        categories: categoriesReducer
    }
})