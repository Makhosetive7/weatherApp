import React, { useEffect, useState } from "react";
import { useGetWeatherByLocationQuery } from "../Services/WeatherAPI";
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="weatherInfoe-container">
      {weather && (
        <div className="tired">
          <div className="location">
            <h3>
              {weather.name}
            </h3>
          </div>
          <div className="temperature">
            <div className="heading">
              <h1>{weather.main.temp}°c</h1>
              <p>{weather.weather[0].description}</p>
            </div>

            <div className="bottom">
                <div className="details">
                    <span>Pressure</span>
                    <p>{weather.main.pressure}°K</p>
                </div>
                <div className="details">
                    <span>Temperature-Min</span>
                    <p>{weather.main.temp_min}°K</p>
                </div>
                <div className="details">
                    <span>Temperatur-Max</span>
                    <p>{weather.main.temp_max}°K</p>
                </div>
                <div className="details">
                    <span>Humidity</span>
                    <p>{weather.main.humidity}°K</p>
                </div>
                <div className="details">
                    <span>wind Speed</span>
                    <p>{weather.wind.speed}</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfoe;
