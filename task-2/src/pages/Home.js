import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { delEmployee, fetchEmployees } from "../employeeSlice";

import HamburgerMenu from "../components/HamburgerMenu";
import Dialog from "../components/Dialog";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService";
import store from "../store";
import { fetchCurrentLoactionWeather } from "../utils/helper";

store.dispatch(fetchEmployees());

export default function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [weatherError, setWeatherError] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const employees = useSelector((state) => state.employee.employee);
  const employeeStatus = useSelector((state) => state.employee.status);
  console.log(employeeStatus);
  console.log(employees);

  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(employees);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  useEffect(function () {
    async function getWeather() {
      setWeatherLoading(true);
      await fetchCurrentLoactionWeather()
        .then((res) => res)
        .then((result) => setWeatherData(result))
        .catch((error) => setWeatherError(error));
        setWeatherLoading(false);
    }
    getWeather();
  }, []);

  if (!userId) return <p>Please Login First</p>;

  if (employeeStatus === "Loading") return <p>Loading data..Please Wait</p>;
  return (
    <>
      <nav>
        <h2>List Of Employees</h2>
        {console.log(weatherData)}

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

      <div className={styles.weather}>
        {!weatherError ? (
          <>
            <h3>
              Current Location : <b>{weatherData.name}</b>
            </h3>
            <h4>{Math.floor(weatherData?.main?.temp - 273.15)}°C </h4>
            <p>Humidity: {weatherData?.main?.humidity}</p>
            <p></p>
          </>
        ) : (
          <p>{weatherError.message}</p>
        )}
      </div>
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
