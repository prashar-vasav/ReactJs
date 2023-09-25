import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateEmployee } from "../employeeSlice";
import Button from "../components/Button";
import Input from "../components/Input";

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function UpdateUser() {
  const { id } = useParams();
  const emp = useSelector((state) => state.employee.employee);
  const dispatch = useDispatch();
  console.log(emp);
  console.log(id);
  const getEmployeeById = emp.filter((item) => item.id === id);
  console.log(getEmployeeById[0]);
  const {
    fname: currFname,
    lname: currLname,
    phno: currPhno,
    department: currDepartment,
    email: currEmail,
  } = getEmployeeById[0];
  console.log(currDepartment, currEmail, currFname, currLname, currPhno);
  const [newFname, setNewFname] = useState(currFname);
  const [newLname, setNewLname] = useState(currLname);
  const [newEmail, setNewEmail] = useState(currEmail);
  const [newPhno, setNewPhno] = useState(currPhno);
  const [newDepartment, setNewDepartment] = useState(currDepartment);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function updateHandler() {
    if (newPhno || newEmail) {
      if (!emailRegex.test(newEmail)) {
        setErrors({ ...errors, emailError: "Enter a Valid Email Address" });
        return;
      }
      if (newPhno.length !== 10) {
        setErrors({ ...errors, phnoError: "Enter a Valid Phone Number" });
        return;
      }
    }
    if (!newFname || !newEmail || !newDepartment || !newPhno) return;
    const updatedUser = {
      id: id,
      fname: newFname,
      lname: newLname,
      email: newEmail,
      department: newDepartment,
      phno: newPhno,
    };
    console.log(updatedUser);
    dispatch(updateEmployee(updatedUser));
    navigate(-1);
  }
  function backHandler() {
    navigate("/home");
  }

  return (
    <>
      <h2 className={styles.header}>Update Employee</h2>
      <form className={styles.form} name="addEmp" method="dialog">
        <div className={styles.inputFields}>
          <div>
            <Input
              type="text"
              name="fname"
              placeholder="FIRST NAME"
              defaultValue={currFname}
              onChange={(e) => setNewFname(e.target.value)}
              required
            />
            <div className={styles.form} id="email">
              <Input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                defaultValue={currEmail}
                onChange={(e) => setNewEmail(e.target.value)}
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
              defaultValue={currDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
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
              defaultValue={currLname}
              onChange={(e) => setNewLname(e.target.value)}
            />
            <br />
            <div className="form" id="phno">
              <Input
                type="number"
                name="pno"
                placeholder="PHONE NO"
                defaultValue={currPhno}
                onChange={(e) => setNewPhno(e.target.value)}
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
          <Button type="submit" className={styles.sub} onClick={updateHandler}>
            SUBMIT
          </Button>
        </div>
      </form>
    </>
  );
}

export default UpdateUser;
