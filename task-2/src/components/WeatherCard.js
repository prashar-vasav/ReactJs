import moment from "moment";
import React from "react";
import styles from "./WeatherCard.module.css";

function WeatherCard({ weatherData }) {
  return (
    <div className={styles.weather}>
      <h3>
        Current Location :{" "}
        <b>
          {weatherData.name}({weatherData.sys.country})
        </b>
      </h3>
      <div className={styles.weatherContent}>
        <h4>
          {Math.floor(weatherData?.main?.temp - 273.15)}°C{" "}
          {weatherData?.weather[0]?.description}{" "}
        </h4>
        <p>Day: {moment().format("dddd")}</p>
        <p>Date: {moment().format("LL")}</p>
        <p>
          Humidity: {weatherData?.main?.humidity}% &diams; Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
          &diams; Sunset:
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
