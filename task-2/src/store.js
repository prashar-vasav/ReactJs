import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./reducers/employeeSlice";
import userReducer from "./reducers/userSlice.js";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer,
  },
});

export default store;
