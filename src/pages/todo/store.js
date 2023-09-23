import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slicer.js";

const todoStore = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default todoStore;
