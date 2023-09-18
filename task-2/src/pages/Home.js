import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../employeeSlice";

export default function Home() {
  const employees = useSelector((state) => state.employee.employee);
  const dispatch = useDispatch();
  // const employees = [
  //   {
  //     id: 32,
  //     fname: "vasav",
  //     lname: "",
  //     email: "prashar.vasav@tftus.com",
  //     phno: "6xxxxxxxx6",
  //     domain: "Development",
  //   },
  //   {
  //     id: 332,
  //     fname: "vasav",
  //     lname: "",
  //     email: "prashar.vasav@tftus.com",
  //     phno: "6xxxxxxxx6",
  //     domain: "Development",
  //   },
  //   {
  //     id: 312,
  //     fname: "vasav",
  //     lname: "",
  //     email: "prashar.vasav@tftus.com",
  //     phno: "6xxxxxxxx6",
  //     domain: "Development",
  //   },
  //   {
  //     id: 352,
  //     fname: "vasav",
  //     lname: "helo",
  //     email: "prashar.vasav@tftus.com",
  //     phno: "6xxxxxxxx6",
  //     domain: "Development",
  //   },
  // ];
  return (
    <>
      <h2>List Of Employees</h2>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Phone No</th>
              <th>Domain</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{`${emp.fname} ${emp.lname}`}</td>
                <td>{emp.email}</td>
                <td>{emp.phno}</td>
                <td>{emp.domain}</td>
                <td>
                  <div>
                    <button>
                      <Link to={`edit/${emp.id}`}>Edit</Link>
                    </button>

                    <button onClick={() => dispatch(deleteEmployee(emp.id))}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
