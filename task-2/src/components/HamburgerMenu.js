import React, { useState } from "react";
import logo from "../assets/Menu.png";
import styles from "./HamburgerMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

export default function HamburgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  function logoutHandler() {
    dispatch(logoutUser());
    navigate("/");
  }
  return (
    <div>
      <img src={logo} alt="logo.png" onClick={() => setShowMenu(!showMenu)} />
      {showMenu && (
        <div className={styles.container}>
          <p className={styles.content}>{userId}</p>
          <button className={styles.logout} onClick={logoutHandler}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
