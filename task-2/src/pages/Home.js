import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../employeeSlice";
import logo from '../Menu.png'

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
  console.log(employees);
  return (
    <>
      <nav>
        <h2>List Of Employees</h2>
        <img src={logo} alt="logo"/>
      </nav>

      <div className={styles.btn}>
        <Link to="/add">
          <button className={styles.add}>Add</button>
        </Link>
      </div>
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
                <td>{emp.department}</td>
                <td>
                  <div className={styles.action}>
                    <Link to={`edit/${emp.id}`}>
                      <span className={styles.edit}>
                        <strong>Edit</strong>
                      </span>
                    </Link>

                    <span
                      className={styles.delete}
                      onClick={() => dispatch(deleteEmployee(emp.id))}
                    >
                      <strong>Delete</strong>
                    </span>
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
