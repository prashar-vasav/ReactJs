import { useState } from "react";
import styles from "./AddEmployee.module.css";
import { useDispatch } from "react-redux";
import { addEmployee } from "../employeeSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Input from "../components/Input";

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export default function AddEmployee() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function domainSelector(e) {
    setDepartment(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    console.log({ fname, lname, email, phno, department });
    if (phno || email) {
      if (!emailRegex.test(email)) {
        setErrors({ ...errors, emailError: "Enter a Valid Email Address" });
        return;
      }
      if (phno.length !== 10) {
        setErrors({ ...errors, phnoError: "Enter a Valid Phone Number" });
        return;
      }
    }
    if (!fname || !department || !email || !phno) return;
    dispatch(
      addEmployee({ id: nanoid(), fname, lname, email, phno, department })
    );
    setEmail("");
    setFname("");
    setLname("");
    setDepartment("");
    setPhno("");
    setErrors({});
    navigate("/home");
  }
  function backHandler() {
    navigate("/home");
  }
  return (
    <>
      <h2 className={styles.header}>Add Employee</h2>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen && (
          <Dialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onConfirm={submitHandler}
          />
        )}
        <div className={styles.inputFields}>
          <div>
            <Input
              type="text"
              name="fname"
              placeholder="FIRST NAME"
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <div className={styles.form} id="email">
              <Input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              {errors.emailError && (
                <span className={styles.error}>{errors.emailError}</span>
              )}
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
            <Input
              type="text"
              name="lname"
              placeholder="LAST NAME"
              onChange={(e) => setLname(e.target.value)}
              required={false}
            />
            <br />
            <div className="form" id="phno">
              <Input
                type="number"
                name="pno"
                placeholder="PHONE NO"
                onChange={(e) => setPhno(e.target.value)}
                required
              />
              <br />
              {errors.phnoError && (
                <span className={styles.error}>{errors.phnoError}</span>
              )}
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className={styles.actions}>
          <Button type="button" className={styles.dis} onClick={backHandler}>
            DISCARD
          </Button>
          <Button type="submit" className={styles.sub}>
            SUBMIT
          </Button>
        </div>
      </form>
    </>
  );
}
