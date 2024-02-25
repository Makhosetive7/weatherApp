import React from "react";
import { useParams } from "react-router-dom";
import { useGetWeatherByCityQuery } from "../Services/WeatherAPI";
import { Link } from "react-router-dom";
import "../Styles/WeatherInfoe.css";
import Loading from "./Loading";
import Error from "./Error";

const SearchedLocation = () => {
  const { city } = useParams();

  const {
    data: weather,
    error,
    isLoading,
    isFetching,
  } = useGetWeatherByCityQuery(city);

  if (isLoading || isFetching)
    return (
      <div className="weatherInfoe-container">
        <Loading />
      </div>
    );
  if (error) return <div><Error/></div>;

  return (
    <div className="weatherInfoe-container">
      <div className="back-component">
        <Link to="/">
          &#8634; Navigate-Back
        </Link>
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

export default SearchedLocation;
