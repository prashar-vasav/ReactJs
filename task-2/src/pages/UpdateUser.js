import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

import { update } from "../reducers/employeeSlice";

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function UpdateUser() {
  const { id } = useParams();
  const emp = useSelector((state) => state.employee.employee);
  const dispatch = useDispatch();

  const getEmployeeById = emp.filter((item) => item._id === id);

  const {
    firstName: currFname,
    lastName: currLname,
    phoneNo: currPhno,
    domain: currDepartment,
    email: currEmail,
  } = getEmployeeById[0];

  const [formData, setFormData] = useState({
    newFname: currFname,
    newLname: currLname,
    newEmail: currEmail,
    newPhno: currPhno,
    newDepartment: currDepartment,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function updateHandler() {
    if (formData.newPhno || formData.newEmail) {
      if (!emailRegex.test(formData.newEmail)) {
        setErrors({ ...errors, emailError: "Enter a Valid Email Address" });
        return;
      }
      if (formData.newPhno.length !== 10) {
        setErrors({ ...errors, phnoError: "Enter a Valid Phone Number" });
        return;
      }
    }
    if (
      !formData.newFname ||
      !formData.newLname ||
      !formData.newEmail ||
      !formData.newPhno ||
      !formData.newDepartment
    )
      return;
    const updatedUser = {
      firstName: formData.newFname,
      lastName: formData.newLname,
      email: formData.newEmail,
      phoneNo: formData.newPhno,
      domain: formData.newDepartment,
    };

    dispatch(update({ id, updatedUser }));
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
              onChange={(e) =>
                setFormData({ ...formData, newFname: e.target.value })
              }
              required
            />
            <div className={styles.form} id="email">
              <Input
                type="email"
                name="email"
                placeholder="EMAIL ID"
                defaultValue={currEmail}
                onChange={(e) =>
                  setFormData({ ...formData, newEmail: e.target.value })
                }
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
              onChange={(e) =>
                setFormData({ ...formData, newDepartment: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, newLname: e.target.value })
              }
              required
            />
            <br />
            <div className="form" id="phno">
              <Input
                type="number"
                name="pno"
                placeholder="PHONE NO"
                defaultValue={currPhno}
                onChange={(e) =>
                  setFormData({ ...formData, newPhno: e.target.value })
                }
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
