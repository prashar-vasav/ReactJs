import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../pages/Home";

function EmployeeList({emp,onClickGetId,onSetIsOpen}) {
  return (
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
                      onClick={() => {
                        onSetIsOpen(!false);
                        onClickGetId(emp.id);
                      }}
                    >
                      <strong>Delete</strong>
                    </span>
                  </div>
                </td>
              </tr>
  )
}

export default EmployeeList