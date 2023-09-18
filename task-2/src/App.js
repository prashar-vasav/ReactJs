import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import Home from "./pages/Home";
import UpdateUser from "./pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/add",
    element: <AddEmployee/>,
  },
  {
    path: "/home",
    element: <Home/>,
   
  },
  {
    path:'/home/edit/:id',
    element:<UpdateUser/>
  }
  
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
