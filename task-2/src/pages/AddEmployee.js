import { useState } from "react";
import styles from "./AddEmployee.module.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../employeeSlice";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [department, setDepartment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function domainSelector(e) {
    setDepartment(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    console.log({ fname, lname, email, phno, department });
    if (!fname || !department || !email || !phno) return;
    dispatch(addEmployee({ fname, lname, email, phno, department }));
    setEmail("");
    setFname("");
    setLname("");
    setDepartment("");
    setPhno("");
    navigate("/home");
  }
  function backHandler() {
    navigate("/home");
  }
  return (
    <>
      <h2 className={styles.header}>Add Employee</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.inputFields}>
          <div>
            <input
              type="text"
              name="fname"
              placeholder="FIRST NAME"
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <div className={styles.form} id="email">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <span className={styles.error}></span>
            </div>

            <select
              name="department"
              className={styles.dep}
              placeholder="DOMAIN"
              required
              onChange={(e) => domainSelector(e)}
            >
              <option value="">DOMAIN</option>
              <option value="Development">DEVELOPMENT</option>
              <option value="Testing">TESTING</option>
              <option value="Operations">OPERATIONS</option>
              <option value="Accounts">ACCOUNTS</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="lname"
              placeholder="LAST NAME"
              onChange={(e) => setLname(e.target.value)}
            />
            <br />
            <div className="form" id="phno">
              <input
                type="number"
                name="pno"
                placeholder="PHONE NO"
                onChange={(e) => setPhno(e.target.value)}
                required
              />
              <br />
              <span className={styles.error}></span>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.dis} onClick={backHandler}>
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
