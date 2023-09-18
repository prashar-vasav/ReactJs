import { useParams } from "react-router-dom";
import styles from "./UpdateUser.module.css";
import { useSelector } from "react-redux";

function UpdateUser() {
  const { id } = useParams();
  console.log(id);
  const emp = useSelector((state) => state.employee.employee);
  const getEmployeeById = emp.filter((item) => item.id === id);
  console.log(getEmployeeById);

  return (
    <>
      <h2 className={styles.header}>Update Employee</h2>
      <form className={styles.form} name="addEmp" method="dialog">
        <div className={styles.inputFields}>
          <div>
            <input type="text" name="fname" placeholder="FIRST NAME" />
            <div className={styles.form} id="email">
              <input type="email" name="email" placeholder="EMAIL ID" />
              <br />
              <span className={styles.error}></span>
            </div>

            <select
              name="department"
              className={styles.dep}
              placeholder="DOMAIN"
            >
              <option defaultValue="Domian" selected disabled>
                DOMAIN
              </option>
              <option>DEVELOPMENT</option>
              <option>TESTING</option>
              <option>OPERATIONS</option>
              <option>ACCOUNTS</option>
            </select>
          </div>
          <div>
            <input type="text" name="lname" placeholder="LAST NAME" />
            <br />
            <div className="form" id="phno">
              <input type="number" name="pno" placeholder="PHONE NO" />
              <br />
              <span className={styles.error}></span>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.dis}>
            DISCARD
          </button>
          <button type="submit" className={styles.sub}>
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateUser;
