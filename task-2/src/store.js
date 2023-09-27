import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice.js";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
  },
});

export default store;
