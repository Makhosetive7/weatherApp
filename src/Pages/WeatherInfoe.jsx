import React, { useEffect, useState } from "react";
import { useGetWeatherByLocationQuery } from "../Services/WeatherAPI";
import Loading from "./Loading";
import Search from "../Components/Search";
import "../Styles/WeatherInfoe.css";

const WeatherInfoe = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const {
    data: weather,
    error,
    isLoading,
  } = useGetWeatherByLocationQuery(location, {
    skip: !location,
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="weatherInfoe-container">
      <div className="search-component">
        <Search />
      </div>
      {weather && (
        <div className="weatherInfoe-elements">
          <div className="location">
            <h3>{weather.name}</h3>
          </div>
          <div className="temperature">
            <div className="top">
            <div className="heading">
              <h1>{weather.main.temp}°c</h1>
              <p>{weather.weather[0].description}</p>
            </div>
            </div>

            <div className="bottom">
              <div className="details">
                <span>Pressure</span>
                <p>{weather.main.pressure}hPa</p>
              </div>
              <div className="details">
                <span>Temperature-Min</span>
                <p>{weather.main.temp_min}°c</p>
              </div>
              <div className="details">
                <span>Temperature-Max</span>
                <p>{weather.main.temp_max}°c</p>
              </div>
              <div className="details">
                <span>Humidity</span>
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="details">
                <span>wind Speed</span>
                <p>{weather.wind.speed}m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfoe;
