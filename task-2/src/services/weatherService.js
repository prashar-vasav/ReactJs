import axios from "axios";

const API_KEY = `96f34739413acbfb53499a15b16d48a9`;

async function getWeatherByLocation(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error("Error in Fetching Location", error);
    throw error;
  }
}
export { getWeatherByLocation };
