import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newUser } from "../reducers/userSlice";
import Input from "../components/Input";
import Button from "../components/Button";
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    if (email || password) {
      if (!emailRegex.test(email)) {
        setErrors({ ...errors, emailError: "ENTER A VALID EMAIL ADDRESS" });
        return;
      }

      if (!passwordRegex.test(password)) {
        setErrors({
          ...errors,
          passwordError:
            "8-16 characters , 1 Special Character, 1 Uppercase, 1 Lowercase, 1 number",
        });
        return;
      }
    }
    dispatch(newUser(email));
    setErrors({});
    navigate("/home");
  }

  if (userId) return <p>User Already LoggedIn As {userId}</p>;
  return (
    <>
      <h2 className={styles.header}>Welcome</h2>
      <form name="loginForm" className={styles.form} onSubmit={submitHandler}>
        <div className="form" id="email">
          <Input
            type="email"
            name="email"
            placeholder="USER ID"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          {errors.emailError && (
            <span className={styles.error}>{errors.emailError}</span>
          )}
        </div>
        <div className="form" id="pass">
          <Input
            type="password"
            name="pass"
            placeholder="PASSWORD"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          {errors.passwordError && (
            <span className={styles.error}>{errors.passwordError}</span>
          )}
        </div>
        <br />
        <br />
        <Button type="submit">LOGIN</Button>
      </form>
    </>
  );
}
