import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  employee: [
    {
      id: nanoid(),
      fname: "vasav",
      lname: "helo",
      email: "prashar.vasav@tftus.com",
      phno: "1234567890",
      department: "Development",
    },
  ],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee(state, action) {
      const emp = {
        id: nanoid(),
        fname: action.payload.fname,
        lname: action.payload.lname,
        email: action.payload.email,
        phno: action.payload.phno,
        department: action.payload.department,
      };
      state.employee.push(emp);
    },
    deleteEmployee(state, action) {
      state.employee = state.employee.filter(
        (emp) => emp.id !== action.payload
      );
    },
    updateEmployee(state, action) {
      state.employee.map((emp) => {
        if (emp.id === action.payload.id) {
          emp.fname = action.payload.fname;
          emp.lname = action.payload.lname;
          emp.email = action.payload.email;
          emp.phno = action.payload.phno;
          emp.department = action.payload.department;
        }
        return null;
      });
    },
  },
});

export default employeeSlice.reducer;

export const { addEmployee, deleteEmployee,updateEmployee } = employeeSlice.actions;
