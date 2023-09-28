import { getWeatherByLocation } from "../services/weatherService";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function fetchCurrentLoactionWeather() {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };
  return await getWeatherByLocation(position.latitude, position.longitude);
}
