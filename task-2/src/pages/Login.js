import styles from "./Login.module.css";

export default function Login() {
  function submitHandler(e) {
    e.preventDefault();
  }
  return (
    <>
      <h2 className={styles.header}>Welcome</h2>
      <form name="loginForm" className={styles.form} onSubmit={submitHandler}>
        <div className="form" id="email">
          <input type="email" name="email" placeholder="USER ID" />
          <br />
          <span className="error"></span>
        </div>
        <div className="form" id="pass">
          <input type="password" name="pass" placeholder="PASSWORD" />
          <br />
          <span className="error"></span>
        </div>
        <br />
        <br />
        <button type="submit">LOGIN</button>
      </form>
    </>
  );
}
