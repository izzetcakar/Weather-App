import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState();
  const apiKey = "3b801e286b4783761c939d5d78cdf8e6";
  const [day, setDay] = useState(0);

  const [city, setCity] = useState({
    id: 2,
    name: "Adana",
    latitude: "37.7648",
    longitude: "38.2786",
    population: 602774,
    region: "Güneydoğu Anadolu",
  });

  const getWeather = async (city, apiKey) => {
    try {
      const { data } = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
      );
      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createDate = (dt, type) => {
    var day = new Date(dt * 1000);
    if (type == "long") {
      let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return day.toLocaleString("en-us", options); // Friday, January 15, 2021
    } else {
      return day.toLocaleString("en-us", { weekday: "long" }); // Friday
    }
  };

  const values = {
    city,
    setCity,
    weather,
    setWeather,
    getWeather,
    apiKey,
    day,
    setDay,
    createDate,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
