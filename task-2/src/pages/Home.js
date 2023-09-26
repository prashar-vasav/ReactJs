import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  
  delEmployee,
  fetchEmployees,
} from "../employeeSlice";

import HamburgerMenu from "../components/HamburgerMenu";
import Dialog from "../components/Dialog";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService";

export default function Home() {
  const employees = useSelector((state) => state.employee.employee);
  console.log(employees);

  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  console.log(employees);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [isOpen]);
  if (!userId) return <p>Please Login First</p>;
  return (
    <>
      <nav>
        <h2>List Of Employees</h2>

        <HamburgerMenu />
      </nav>
      {isOpen && (
        <Dialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={() => {
            dispatch(delEmployee(dialogData));
            setIsOpen(!isOpen);
          }}
        />
      )}

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
              <tr key={emp._id}>
                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>{emp.email}</td>
                <td>{emp.phoneNo}</td>
                <td>{emp.domain}</td>
                <td>
                  <div className={styles.action}>
                    <Link to={`edit/${emp._id}`}>
                      <span className={styles.edit}>
                        <strong>Edit</strong>
                      </span>
                    </Link>
                    <span
                      className={styles.delete}
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setDialogData(emp._id);
                      }}
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
