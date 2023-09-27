import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "./services/employeeService";

const initialState = {
  employee: [
    {
      _id: nanoid(),
      firstName: "vasav",
      lastName: "helo",
      email: "prashar.vasav@tftus.com",
      phoneNo: "1234567890",
      domain: "Development",
    },
  ],
  status: "idle",
  error: "",
};

export const fetchEmployees = createAsyncThunk(
  "employees/getAllEmployees",
  async function () {
    return getAllEmployees();
  }
);

export const newEmployee = createAsyncThunk(
  "employees/createEmployee",
  async function (data) {
    return createEmployee(data);
  }
);
export const update = createAsyncThunk(
  "employees/updateEmployee",
  async function ({ id, updatedUser }) {
    return updateEmployee(id, updatedUser);
  }
);
export const delEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async function (id) {
    return deleteEmployee(id);
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // addEmployee(state, action) {
    //   const emp = {
    //     _id: action.payload._id,
    //     firstName: action.payload.firstName,
    //     lastName: action.payload.lastName,
    //     email: action.payload.email,
    //     phoneNo: action.payload.phoneNo,
    //     domain: action.payload.domain,
    //   };
    //   state.employee.push(emp);
    // },
    deleteEmployee(state, action) {
      state.employee = state.employee.filter(
        (emp) => emp._id !== action.payload
      );
    },
    // updateEmployee(state, action) {
    //   state.employee.map((emp) => {
    //     if (emp._id === action.payload._id) {
    //       emp.firstName = action.payload.firstName;
    //       emp.lastName = action.payload.lastName;
    //       emp.email = action.payload.email;
    //       emp.phoneNo = action.payload.phoneNo;
    //       emp.domain = action.payload.domain;
    //     }
    //     return null;
    //   });
    // },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "idle";
        state.employee = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "error in fetching";
        state.error = action.error.message;
      })
      .addCase(newEmployee.fulfilled, (state, action) => {
        state.status = "idle";
        state.employee.push(action.payload);
      })
      .addCase(newEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.employee.map((emp) => {
          if (emp._id === action.payload._id) {
            emp.firstName = action.payload.firstName;
            emp.lastName = action.payload.lastName;
            emp.email = action.payload.email;
            emp.phoneNo = action.payload.phoneNo;
            emp.domain = action.payload.domain;
          }
          return null;
        });
      })
      .addCase(update.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(delEmployee.fulfilled, (state, action) => {
        state.status = "idle";
        state.employee = state.employee.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(delEmployee.pending, (state, action) => {
        state.status = "loading";
      }),
});

export default employeeSlice.reducer;

export const { addEmployee } = employeeSlice.actions;
