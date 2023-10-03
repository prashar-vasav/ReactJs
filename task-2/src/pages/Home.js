import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { delEmployee, fetchEmployees } from "../reducers/employeeSlice";

import HamburgerMenu from "../components/HamburgerMenu";
import Dialog from "../components/Dialog";
import { useEffect, useState } from "react";
import store from "../store";
import {
  fetchCurrentLoactionWeather,
  fetchWeatherByQuery,
} from "../utils/helper";
import WeatherCard from "../components/WeatherCard";
import Search from "../components/Search";

store.dispatch(fetchEmployees());

export default function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [weatherError, setWeatherError] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { employee, status } = useSelector((state) => state.employee);

  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  function searchHandler(e) {
    e.preventDefault();
    if (searchQuery.length <= 2) {
      setWeatherError({
        message: "City character length must be greater than 2",
      });
      return;
    }
    setWeatherLoading(true);
    fetchWeatherByQuery(searchQuery)
      .then((response) => response)
      .then((result) => {
        setWeatherData(result);
      })
      .catch((error) => setWeatherError(error.response.data));
    setWeatherLoading(false);
    setWeatherError("");
    setSearchQuery("");
  }

  if (!userId) return <p>Please Login First</p>;

  if (status === "Loading") return <p>Loading data..Please Wait</p>;
  return (
    <>
      <nav>
        <h2>List Of Employees</h2>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={searchHandler}
        />
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

      <div>
        {weatherLoading && <p className={styles.error}>Leading...</p>}
        {!weatherError && typeof weatherData.weather != "undefined" ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <p className={styles.error}>{weatherError.message}</p>
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
            {employee.map((emp) => (
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
