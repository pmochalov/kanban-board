import { configureStore } from "@reduxjs/toolkit";
import appReductor from './slices/appSlice';
import todosReducer from './slices/todosSlice';
import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
    reducer:{
        app: appReductor,
        todos: todosReducer,
        categories: categoriesReducer
    }
})