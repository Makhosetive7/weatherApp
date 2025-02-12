import React, { useEffect, useState } from "react";
import { useGetWeatherByLocationQuery } from "../Services/WeatherAPI";
import Loading from "./Loading";
import Search from "../Components/Search";
import "../Styles/WeatherInfoe.css";
import Error from "./Error";
import cloudySpring from "../Svg/cloudy-spring-svgrepo-com.svg";
import nightForecast from "../Svg/night-forecast-svgrepo-com.svg";
import snowingForecast from "../Svg/snowing-forecast-svgrepo-com.svg";
import rainForecast from "../Svg/rain-forecast-svgrepo-com.svg";
import winterSeason from "../Svg/winter-season-svgrepo-com.svg";
import tornadoHurricane from "../Svg/tornado-hurricane-svgrepo-com.svg";
import sunset from "../Svg/sunset-svgrepo-com.svg";

const WeatherInfoe = () => {
  // List of imported SVGs
  const image = [
    cloudySpring,
    nightForecast,
    snowingForecast,
    rainForecast,
    winterSeason,
    tornadoHurricane,
    sunset,
  ];

  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  // Function to randomly select background image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * image.length);
    return image[randomIndex];
  };

  // Set background image on component mount
  useEffect(() => {
    const randomImage = getRandomImage();
    setBackgroundImage(randomImage);
  }, []);

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

  if (isLoading || !weather)
    return (
      <div className="weatherInfoe-container">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div>
        <Error />
      </div>
    );

  return (
    <div className="weatherInfoe-container">
      <div
        className="wrapper"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          fontSize: "24px",
        }}
      >
        <div className="search-component">
          <Search />
        </div>
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
              <div className="humidity">
                <h3>Humidity</h3>
                <h1>{weather.main.humidity}%</h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 1024 1024"
                    class="icon"
                    version="1.1"
                  >
                    <path
                      d="M339.7 882.5C196.6 882.5 80.2 766.1 80.2 623c0-133.2 204.8-395.1 228.2-424.5 5.8-7.3 14.5-11.6 23.8-11.7 9.4-0.1 18.1 3.9 24.1 11 1.5 1.8 37.7 44.8 82.2 105.2 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-21.3-29-40.9-54-55.3-72.1-69.2 92-191.2 271.5-191.2 355.4 0 108.9 88.6 197.6 197.6 197.6S537.3 731.9 537.3 623c0-17.1 13.9-31 31-31s31 13.9 31 31c-0.1 143.1-116.5 259.5-259.6 259.5z"
                      fill="#1A1A1A"
                    />
                    <path
                      d="M363.7 468.8c-27.9 59.7-46.8 115.7-46.8 158.4 0 164.6 133.4 298 298 298s298-133.4 298-298c0-12.8-1.9-26.9-5.5-41.9-327.2 33.9-284.9-194.9-543.7-116.5z"
                      fill="#00B36A"
                    />
                    <path
                      d="M333.6 567.6c-38.2 239.9 123 357.7 287.3 357.7 92.8 0 144.9-12.1 199.6-78.6-261.5 20.7-428.7-99.2-486.9-279.1z"
                      fill="#009957"
                    />
                    <path
                      d="M614.9 956.1C433.5 956.1 286 808.5 286 627.2c0-173.4 283.4-532.4 295.5-547.6 5.8-7.3 14.5-11.6 23.8-11.7 9.3-0.1 18.1 3.9 24.1 11 2 2.3 49 58.2 106.8 136.6 10.1 13.8 7.2 33.2-6.6 43.3-13.8 10.1-33.2 7.2-43.3-6.6-31.8-43.2-60.6-79.8-79.9-103.7C517 266.1 347.9 512.3 347.9 627.2c0 147.2 119.8 267 267 267s267-119.8 267-267c0-29.7-13.2-87.9-76.4-196.2-8.6-14.8-3.6-33.7 11.2-42.3 14.8-8.6 33.7-3.6 42.3 11.2 57.1 97.9 84.8 172.2 84.8 227.4 0 181.3-147.6 328.8-328.9 328.8z"
                      fill="#1A1A1A"
                    />
                  </svg>
                </span>
              </div>

              <div className="windSpeed">
                <h3>Wind Speed</h3>
                <h1>{weather.wind.speed}m/s</h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 1024 1024"
                    class="icon"
                    version="1.1"
                  >
                    <path
                      d="M222.102127 765.067103a24.785044 24.785044 0 0 1-22.365552-35.407206l108.723727-228.588921a24.785044 24.785044 0 1 1 44.76651 21.244323l-108.723727 228.600724a24.785044 24.785044 0 0 1-22.400958 14.15108zM638.113191 765.067103A24.785044 24.785044 0 0 1 615.440777 750.384915l-103.542472-231.610336a24.785044 24.785044 0 0 1 45.250409-20.24112l103.577879 231.622139a24.785044 24.785044 0 0 1-22.613402 34.911505z"
                      fill="#203529"
                    />
                    <path
                      d="M669.377754 966.864572H194.460901a25.493188 25.493188 0 0 1-25.493188-25.493188V740.270257a25.493188 25.493188 0 0 1 25.493188-25.493189h168.774348a25.493188 25.493188 0 0 1 0 50.986377h-143.28116V915.866393H643.884566V765.763445h-56.415482a25.493188 25.493188 0 0 1 0-50.986377h81.90867a25.493188 25.493188 0 0 1 25.493188 25.493189v201.101127a25.493188 25.493188 0 0 1-25.493188 25.493188z"
                      fill="#203529"
                    />
                    <path
                      d="M499.954274 348.017427l97.865517-167.971785 373.427998 123.040041-412.635577 118.555127-58.657938-73.623383zM393.048117 576.181462l-87.125332 424.638621 291.897006-264.999332-97.865517-184.152878-106.906157 24.513589zM353.026172 354.508748L43.354749 82.227335l64.32309 365.449574h197.159125l48.189208-93.168161z"
                      fill="#178E3B"
                    />
                    <path
                      d="M310.938806 476.085291h-0.188838L113.956717 474.621793a24.785044 24.785044 0 0 1-24.159517-20.158503L13.954965 55.813559a24.785044 24.785044 0 0 1 41.898527-22.129504L371.131056 349.75238A24.785044 24.785044 0 1 1 336.030713 384.758304L77.723343 125.801803l56.94659 299.403333 176.481316 1.310067a24.785044 24.785044 0 0 1-0.177036 49.570088zM291.039956 1024a24.785044 24.785044 0 0 1-23.923468-31.229156L380.63199 571.236256a24.785044 24.785044 0 1 1 47.85874 12.888222l-92.542634 343.638736 230.807773-199.023904L477.352674 571.236256a24.785044 24.785044 0 0 1 43.114174-24.46638l99.458842 175.21846a24.785044 24.785044 0 0 1-5.370093 31.00491l-307.334547 264.987529a24.785044 24.785044 0 0 1-16.181094 6.019225zM547.553361 447.912957a24.785044 24.785044 0 0 1-6.373297-48.74392l360.173901-96.01254-287.766165-100.320417L517.799506 365.874461a24.785044 24.785044 0 1 1-42.7483-25.103709L581.213811 160.123188a24.785044 24.785044 0 0 1 29.506005-10.846408l383.141376 133.6504a24.785044 24.785044 0 0 1-1.782163 47.351237l-438.128766 116.843779a24.785044 24.785044 0 0 1-6.396902 0.790761zM291.039956 806.517139h-99.399829a11.613564 11.613564 0 1 1 0-23.227127h99.399829a11.613564 11.613564 0 0 1 0 23.227127zM674.66523 882.040709H507.295368a12.392522 12.392522 0 0 1 0-24.785044h167.35806a12.392522 12.392522 0 0 1 0 24.785044zM690.716497 109.5735a12.33351 12.33351 0 0 1-7.293885-2.36048C588.590313 37.921118 472.631713 10.999839 357.062593 31.382587a12.392522 12.392522 0 0 1-4.307877-24.407367A450.934372 450.934372 0 0 1 698.057591 87.172541a12.392522 12.392522 0 0 1-7.317489 22.424564zM292.574269 149.548235a12.392522 12.392522 0 0 1-4.897997-23.78184A361.991471 361.991471 0 0 1 496.944661 102.59828a12.392522 12.392522 0 0 1-4.602936 24.360158 337.194624 337.194624 0 0 0-194.881262 21.586593 12.357115 12.357115 0 0 1-4.886194 1.003204zM208.871634 85.142528a12.392522 12.392522 0 0 1-6.278878-23.085498 450.308845 450.308845 0 0 1 79.15871-36.587447 12.392522 12.392522 0 0 1 8.167262 23.404164 425.429382 425.429382 0 0 0-74.791821 34.569235 12.33351 12.33351 0 0 1-6.255273 1.699546z"
                      fill="#203529"
                    />
                    <path
                      d="M431.913426 598.051313a138.51299 138.51299 0 1 1 138.51299-138.51299A138.666421 138.666421 0 0 1 431.913426 598.051313z m0-227.455891a88.942901 88.942901 0 1 0 88.942902 88.942901A89.049123 89.049123 0 0 0 431.913426 370.595422z"
                      fill="#203529"
                    />
                    <path
                      d="M432.137672 521.04064a61.502317 61.502317 0 1 1 61.502317-61.502317 12.392522 12.392522 0 0 1-24.785044 0 36.717273 36.717273 0 1 0-36.717273 36.717273 12.392522 12.392522 0 0 1 0 24.785044z"
                      fill="#203529"
                    />
                    <path
                      d="M247.347464 364.694221a12.357115 12.357115 0 0 1-8.780987-3.646942l-100.544662-101.063968a12.392522 12.392522 0 1 1 17.573776-17.479358l100.544663 101.063968a12.392522 12.392522 0 0 1-8.79279 21.1263zM590.998003 336.698923A12.392522 12.392522 0 0 1 580.623691 317.484613l45.002559-69.103063A12.392522 12.392522 0 0 1 646.386675 262.013324l-44.990756 69.055854a12.38072 12.38072 0 0 1-10.397916 5.629745zM426.354495 816.726217a12.392522 12.392522 0 0 1-8.120052-21.751827l86.665037-75.157696a12.392522 12.392522 0 0 1 16.240105 18.659597l-86.665037 75.157696a12.345312 12.345312 0 0 1-8.120053 3.09223z"
                      fill="#2FA65B"
                    />
                    <path
                      d="M661.78881 807.284295h-63.426109a12.392522 12.392522 0 0 1 0-24.785044h63.426109a12.392522 12.392522 0 0 1 0 24.785044z"
                      fill="#203529"
                    />
                    <path
                      d="M432.137672 459.538323m-11.377515 0a11.377516 11.377516 0 1 0 22.755031 0 11.377516 11.377516 0 1 0-22.755031 0Z"
                      fill="#203529"
                    />
                  </svg>
                </span>
              </div>

              <div className="pressure">
                <h3>Pressure</h3>
                <h1>{weather.main.pressure} hPa</h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="airpressure"
                    viewBox="0 0 220.0005 225.1683"
                    enable-background="new 0 0 220.0005 225.1683"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path
                        fill="#5CB0FF"
                        d="M103.9615,177.6683c-0.3633,0-0.7227,0.0117-1.0781,0.0273c-1.1055,0.0664-2.1602-0.3477-2.9492-1.1016   s-1.2383-1.8008-1.2383-2.8945c0-15.7461-13.5312-28.5312-30.1641-28.5312c-13.2266,0-24.7852,8-28.7695,19.9062   c-0.5938,1.7617-2.3555,2.9219-4.1719,2.7109c-0.8203-0.0781-1.6484-0.1172-2.4883-0.1172   c-13.8398,0-25.1016,11.1016-25.1016,24.75c0,14.0078,11.9336,25.2734,26.1914,24.7265c0.207-0.0156,0.4336-0.0039,0.6523,0.0234   h69.875c0.0977-0.0117,0.1953-0.0195,0.293-0.0273c10.6484-0.5391,18.9883-9.2031,18.9883-19.7226   C124.0005,186.5277,115.0123,177.6683,103.9615,177.6683z"
                      />
                      <path
                        fill="#D0E8FF"
                        d="M114.9888,105.141c0.0977,0.0078,0.1992,0.0156,0.2969,0.0273h69.8828   c0.1523-0.0195,0.3047-0.0273,0.4609-0.0273c0.0586,0,0.121,0,0.1797,0.0039c14.1992,0.6211,26.1875-10.7188,26.1914-24.7265   c0-13.6485-11.2617-24.75-25.1016-24.75c-0.8398,0-1.6719,0.0391-2.4883,0.1172c-1.7969,0.1562-3.582-0.9414-4.1719-2.7109   c-3.9844-11.9062-15.543-19.9062-28.7695-19.9062c-16.6328,0-30.1641,12.7852-30.1641,28.5c0,1.0938-0.4492,2.1562-1.2383,2.9102   c-0.793,0.7539-1.8633,1.1719-2.9492,1.1172c-0.3555-0.0156-0.7148-0.0273-1.0781-0.0273c-11.0508,0-20.0391,8.8594-20.0391,19.75   C96.0005,95.9379,104.3404,104.6019,114.9888,105.141z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M106.481,169.7777c-2.0352-18.3047-18.2773-32.6094-37.9492-32.6094   c-15.5977,0-29.3906,8.9258-35.2578,22.5c-0.0586,0-0.1133,0-0.1719,0c-18.2539,0-33.1016,14.6914-33.1016,32.75   c0,18.0585,14.8477,32.75,33.1016,32.75c0.3164,0,0.6328-0.0039,0.9453-0.0117c0.1055,0.0078,0.2148,0.0117,0.3203,0.0117h70.8555   c0.2461,0,0.4883-0.0234,0.7266-0.0703c14.6523-1.0156,26.0508-13.0742,26.0508-27.6796   C132.0005,182.9574,120.7662,171.0433,106.481,169.7777z M105.0123,217.141c-0.0977,0.0078-0.1953,0.0156-0.293,0.0273h-69.875   c-0.2188-0.0273-0.4453-0.0391-0.6523-0.0234c-14.2578,0.5469-26.1914-10.7188-26.1914-24.7265   c0-13.6485,11.2617-24.75,25.1016-24.75c0.8398,0,1.668,0.0391,2.4883,0.1172c1.8164,0.2109,3.5781-0.9492,4.1719-2.7109   c3.9844-11.9062,15.543-19.9062,28.7695-19.9062c16.6328,0,30.1641,12.7852,30.1641,28.5312c0,1.0938,0.4492,2.1406,1.2383,2.8945   s1.8438,1.168,2.9492,1.1016c0.3555-0.0156,0.7148-0.0273,1.0781-0.0273c11.0508,0,20.0391,8.8594,20.0391,19.75   C124.0005,207.9379,115.6607,216.6019,105.0123,217.141z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M114.0279,113.098c0.2461,0.0469,0.4922,0.0703,0.7461,0.0703h70.8594   c0.1055,0,0.2148-0.0039,0.3203-0.0117c0.3125,0.0078,0.6289,0.0117,0.9453,0.0117c18.2539,0,33.1016-14.6914,33.1016-32.75   c0-18.0586-14.8477-32.75-33.1016-32.75c-0.0586,0-0.1133,0-0.1719,0c-5.8672-13.5742-19.6602-22.5-35.2578-22.5   c-19.6602,0-35.8984,14.293-37.9453,32.6094c-14.2852,1.2656-25.5234,13.1797-25.5234,27.6407   C88.0005,100.0199,99.3873,112.0746,114.0279,113.098z M116.0396,65.6683c0.3633,0,0.7227,0.0117,1.0781,0.0273   c1.0859,0.0547,2.1562-0.3633,2.9492-1.1172c0.7891-0.7539,1.2383-1.8164,1.2383-2.9102c0-15.7148,13.5312-28.5,30.1641-28.5   c13.2266,0,24.7852,8,28.7695,19.9062c0.5898,1.7695,2.375,2.8672,4.1719,2.7109c0.8164-0.0781,1.6484-0.1172,2.4883-0.1172   c13.8398,0,25.1016,11.1016,25.1016,24.75c-0.0039,14.0078-11.9922,25.3476-26.1914,24.7265   c-0.0587-0.0039-0.1211-0.0039-0.1797-0.0039c-0.1562,0-0.3086,0.0078-0.4609,0.0273h-69.8828   c-0.0977-0.0117-0.1992-0.0195-0.2969-0.0273c-10.6484-0.5391-18.9883-9.2031-18.9883-19.7226   C96.0005,74.5277,104.9888,65.6683,116.0396,65.6683z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M70.8404,112.1605l-39.2695,5.2148c-2.1875,0.2891-3.7305,2.3008-3.4375,4.4922   c0.2656,2.0117,1.9844,3.4727,3.9609,3.4727c0.1758,0,0.3516-0.0117,0.5312-0.0352l43.7773-5.8125   c1.1406-0.1523,2.1602-0.7852,2.7969-1.7422c0.6406-0.9531,0.8359-2.1406,0.543-3.25L68.4693,72.098   c-0.5703-2.1367-2.7617-3.4023-4.8945-2.8398c-2.1367,0.5703-3.4062,2.7617-2.8398,4.8945L70.8404,112.1605z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M3.9966,109.3402c0.1758,0,0.3516-0.0117,0.5312-0.0352l43.7812-5.8125   c1.1406-0.1523,2.1602-0.7852,2.7969-1.7422c0.6406-0.9531,0.8359-2.1406,0.543-3.25L40.3755,56.098   c-0.5664-2.1367-2.7578-3.3906-4.8945-2.8398c-2.1367,0.5703-3.4062,2.7617-2.8398,4.8945l10.1055,38.0078l-39.2734,5.2148   c-2.1875,0.2891-3.7305,2.3008-3.4375,4.4922C0.3013,107.8793,2.0201,109.3402,3.9966,109.3402z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M141.2544,146.348l39.2734-5.2148c2.1875-0.2891,3.7305-2.3008,3.4375-4.4922   c-0.2891-2.1914-2.3047-3.7305-4.4922-3.4375l-43.7812,5.8125c-1.1406,0.1523-2.1602,0.7852-2.7969,1.7422   c-0.6406,0.9531-0.8359,2.1406-0.543,3.25l11.2734,42.3984c0.4766,1.793,2.0938,2.9727,3.8633,2.9727   c0.3398,0,0.6875-0.043,1.0312-0.1328c2.1367-0.5703,3.4062-2.7617,2.8398-4.8945L141.2544,146.348z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M207.4732,157.2035l-43.7812,5.8125c-1.1406,0.1523-2.1602,0.7852-2.7969,1.7422   c-0.6406,0.9531-0.8359,2.1406-0.543,3.25l11.2734,42.3984c0.4766,1.793,2.0938,2.9727,3.8633,2.9727   c0.3398,0,0.6875-0.043,1.0312-0.1328c2.1367-0.5703,3.4062-2.7617,2.8398-4.8945l-10.1055-38.0039l39.2734-5.2148   c2.1875-0.2891,3.7305-2.3008,3.4375-4.4922C211.6763,158.4496,209.6646,156.9222,207.4732,157.2035z"
                      />
                    </g>
                    <path
                      fill="#FF5D5D"
                      d="M184.3859,194c-1.0234,0-2.0479-0.3906-2.8281-1.1719c-1.5625-1.5615-1.5625-4.0947,0-5.6562  l14.1426-14.1416c1.5625-1.5625,4.0957-1.5625,5.6562,0c1.5625,1.5615,1.5625,4.0947,0,5.6562l-14.1426,14.1416  C186.4328,193.6094,185.4094,194,184.3859,194z"
                    />
                    <path
                      fill="#FF5D5D"
                      d="M198.5285,194.001c-1.0234,0-2.0479-0.3906-2.8281-1.1719l-14.1426-14.1426  c-1.5625-1.5615-1.5625-4.0947,0-5.6562c1.5605-1.5625,4.0957-1.5625,5.6562,0l14.1426,14.1426  c1.5625,1.5615,1.5625,4.0947,0,5.6562C200.5764,193.6104,199.552,194.001,198.5285,194.001z"
                    />
                    <path
                      fill="#00D40B"
                      d="M154.3859,84c-7.7197,0-14-6.2803-14-14s6.2803-14,14-14s14,6.2803,14,14S162.1057,84,154.3859,84z   M154.3859,64c-3.3086,0-6,2.6914-6,6s2.6914,6,6,6s6-2.6914,6-6S157.6945,64,154.3859,64z"
                    />
                    <path
                      fill="#FFC504"
                      d="M15.6994,30.6279c-1.0605,0-2.0781-0.4219-2.8281-1.1719L1.5578,18.1416  c-1.5625-1.5615-1.5625-4.0947,0-5.6562L12.8713,1.1719c1.5605-1.5625,4.0957-1.5625,5.6562,0L29.841,12.4854  c1.5625,1.5615,1.5625,4.0947,0,5.6562L18.5275,29.4561C17.7775,30.2061,16.76,30.6279,15.6994,30.6279z M10.0422,15.3135  l5.6572,5.6572l5.6572-5.6572l-5.6572-5.6562L10.0422,15.3135z"
                    />
                  </svg>
                </span>
              </div>

              <div className="minimumTemperature">
                <h3>Minimum Temperature</h3>
                <h1>{weather.main.temp_min.toFixed(3)}°C</h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="nighttemperature"
                    viewBox="0 0 191.6147 220"
                    enable-background="new 0 0 191.6147 220"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path
                        fill="#D0E8FF"
                        d="M8.2007,36c0,15.4395,12.5605,28,28,28c2.7246,0,5.4238-0.3965,8.0078-1.166   C36.6714,56.0723,32.2007,46.3164,32.2007,36s4.4707-20.0723,12.0078-26.834C41.6245,8.3965,38.9253,8,36.2007,8   C20.7612,8,8.2007,20.5605,8.2007,36z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M139.6147,24c2.209,0,4,1.791,4,4s-1.791,4-4,4h-8v20h8c2.209,0,4,1.791,4,4s-1.791,4-4,4h-8v20h8   c2.209,0,4,1.791,4,4s-1.791,4-4,4h-8v20h8h12V18.0078c0-5.5176-4.4863-10.0078-10-10.0078s-10,4.4902-10,10.0078V24H139.6147z"
                      />
                      <path
                        fill="#5CB0FF"
                        d="M154.4057,130.5391c-1.6621-0.5273-2.791-2.0684-2.791-3.8125v-10.707h-20v10.707   c0,1.7441-1.1289,3.2852-2.791,3.8125c-17.4707,5.543-29.209,21.5156-29.209,39.7461c0,23.002,18.8418,41.7148,42,41.7148   s42-18.7129,42-41.7148C183.6147,152.0547,171.8764,136.082,154.4057,130.5391z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M159.6147,123.8887V116v-3.9805V18.0078c0-9.9297-8.0742-18.0078-18-18.0078s-18,8.0781-18,18.0078v94.0117   V116v7.8887c-19.2578,7.3594-32,25.6504-32,46.3965c0,27.4121,22.4297,49.7148,50,49.7148s50-22.3027,50-49.7148   C191.6147,149.5391,178.8725,131.248,159.6147,123.8887z M141.6147,8c5.5137,0,10,4.4902,10,10.0078V108h-12h-8V88h8   c2.209,0,4-1.791,4-4s-1.791-4-4-4h-8V60h8c2.209,0,4-1.791,4-4s-1.791-4-4-4h-8V32h8c2.209,0,4-1.791,4-4s-1.791-4-4-4h-8v-5.9922   C131.6147,12.4902,136.1011,8,141.6147,8z M141.6147,212c-23.1582,0-42-18.7129-42-41.7148   c0-18.2305,11.7383-34.2031,29.209-39.7461c1.6621-0.5273,2.791-2.0684,2.791-3.8125v-10.707h20v10.707   c0,1.7441,1.1289,3.2852,2.791,3.8125c17.4707,5.543,29.209,21.5156,29.209,39.7461C183.6147,193.2871,164.7729,212,141.6147,212z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M54.2026,11.7441c1.2363-0.7148,1.998-2.0352,1.998-3.4629s-0.7617-2.748-1.998-3.4629   C48.7534,1.666,42.5288,0,36.2007,0c-19.8496,0-36,16.1504-36,36s16.1504,36,36,36c6.3281,0,12.5527-1.666,18.002-4.8184   c1.2363-0.7148,1.998-2.0352,1.998-3.4629s-0.7617-2.748-1.998-3.4629C45.5659,55.2598,40.2007,45.9668,40.2007,36   S45.5659,16.7402,54.2026,11.7441z M32.2007,36c0,10.3164,4.4707,20.0723,12.0078,26.834C41.6245,63.6035,38.9253,64,36.2007,64   c-15.4395,0-28-12.5605-28-28s12.5605-28,28-28c2.7246,0,5.4238,0.3965,8.0078,1.166C36.6714,15.9277,32.2007,25.6836,32.2007,36z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M44.0991,99.5137c-1.5625-1.5625-4.0938-1.5625-5.6562,0l-2.8289,2.8291l-2.8274-2.8271   c-1.5625-1.5625-4.0938-1.5625-5.6562,0s-1.5625,4.0938,0,5.6562L29.9582,108l-2.8279,2.8281   c-1.5625,1.5625-1.5625,4.0957,0,5.6562c0.7812,0.7812,1.8047,1.1719,2.8281,1.1719s2.0469-0.3906,2.8281-1.1719l2.8279-2.8281   l2.8284,2.8281c0.7812,0.7812,1.8047,1.1719,2.8281,1.1719s2.0469-0.3906,2.8281-1.1719c1.5625-1.5625,1.5625-4.0938,0-5.6562   l-2.8289-2.8291l2.8289-2.8291C45.6616,103.6074,45.6616,101.0742,44.0991,99.5137z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M92.0991,34.8281l-2.8289-2.8291l2.8289-2.8291c1.5625-1.5625,1.5625-4.0957,0-5.6562   c-1.5625-1.5625-4.0938-1.5625-5.6562,0l-2.8289,2.8291l-2.8274-2.8271c-1.5625-1.5625-4.0938-1.5625-5.6562,0   s-1.5625,4.0938,0,5.6562L77.9582,32l-2.8279,2.8281c-1.5625,1.5625-1.5625,4.0957,0,5.6562   c0.7812,0.7812,1.8047,1.1719,2.8281,1.1719s2.0469-0.3906,2.8281-1.1719l2.8279-2.8281l2.8284,2.8281   c0.7812,0.7812,1.8047,1.1719,2.8281,1.1719s2.0469-0.3906,2.8281-1.1719C93.6616,38.9219,93.6616,36.3906,92.0991,34.8281z"
                      />
                    </g>
                    <path
                      fill="#FF5D5D"
                      d="M4.0001,153.1403c-1.0239,0-2.0474-0.3906-2.8286-1.1714c-1.562-1.5625-1.562-4.0947,0-5.6572  l14.1421-14.1421c1.5625-1.5615,4.0947-1.5615,5.6572,0c1.562,1.5625,1.562,4.0947,0,5.6572L6.8287,151.9689  C6.0475,152.7496,5.024,153.1403,4.0001,153.1403z"
                    />
                    <path
                      fill="#FF5D5D"
                      d="M18.1422,153.1427c-1.0239,0-2.0474-0.3906-2.8286-1.1714L1.1715,137.8287  c-1.562-1.5625-1.562-4.0952,0-5.6572c1.5635-1.5615,4.0957-1.5605,5.6572,0l14.1421,14.1426c1.562,1.5625,1.562,4.0952,0,5.6572  C20.1896,152.7521,19.1656,153.1427,18.1422,153.1427z"
                    />
                    <path
                      fill="#00D40B"
                      d="M90.0001,105.1403c-7.7197,0-14-6.2803-14-14s6.2803-14,14-14s14,6.2803,14,14  S97.7198,105.1403,90.0001,105.1403z M90.0001,85.1403c-3.3086,0-6,2.6914-6,6s2.6914,6,6,6s6-2.6914,6-6  S93.3087,85.1403,90.0001,85.1403z"
                    />
                    <path
                      fill="#FFC504"
                      d="M51.3136,193.4576c-1.0239,0-2.0474-0.3906-2.8286-1.1714l-11.3135-11.3135  c-1.562-1.5625-1.562-4.0947,0-5.6572l11.3135-11.3135c1.5625-1.5615,4.0952-1.5615,5.6567,0l11.314,11.3135  c0.7505,0.7505,1.1719,1.7676,1.1719,2.8286s-0.4214,2.0781-1.1719,2.8286l-11.314,11.3135  C53.361,193.067,52.337,193.4576,51.3136,193.4576z M45.6569,178.1442l5.6567,5.6567l5.6572-5.6567l-5.6572-5.6567L45.6569,178.1442  z"
                    />
                  </svg>
                </span>
              </div>

              <div className="maximumTemperature">
                <h3>Maximum Temperature:</h3>
                <h1>{weather.main.temp_max.toFixed(3)}°C</h1>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="daytemperature"
                    viewBox="0 0 204 221.6562"
                    enable-background="new 0 0 204 221.6562"
                    width="512"
                    height="512"
                  >
                    <g>
                      <path
                        fill="#FFFFFF"
                        d="M152,25.6562c2.209,0,4,1.791,4,4s-1.791,4-4,4h-8v20h20V19.6602c0-5.5156-4.4863-10.0039-10-10.0039   s-10,4.4883-10,10.0039v5.9961H152z"
                      />
                      <path
                        fill="#D0E8FF"
                        d="M36,17.6562c-15.4395,0-28,12.5605-28,28s12.5605,28,28,28s28-12.5605,28-28S51.4395,17.6562,36,17.6562z"
                      />
                      <path
                        fill="#5CB0FF"
                        d="M166.791,132.1953c-1.6621-0.5273-2.791-2.0684-2.791-3.8125v-66.707h-20v19.9805h8c2.209,0,4,1.791,4,4   s-1.791,4-4,4h-8v20h8c2.209,0,4,1.791,4,4s-1.791,4-4,4h-8v10.7266c0,1.7441-1.1289,3.2852-2.791,3.8125   C123.7383,137.7383,112,153.7109,112,171.9414c0,23.002,18.8418,41.7148,42,41.7148s42-18.7129,42-41.7148   C196,153.7109,184.2617,137.7383,166.791,132.1953z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M172,125.5449V61.6562v-3.9805V19.6602c0-9.9277-8.0742-18.0039-18-18.0039s-18,8.0762-18,18.0039v38.0156   v3.9805v63.8887c-19.2578,7.3594-32,25.6504-32,46.3965c0,27.4121,22.4297,49.7148,50,49.7148s50-22.3027,50-49.7148   C204,151.1953,191.2578,132.9043,172,125.5449z M154,9.6562c5.5137,0,10,4.4883,10,10.0039v33.9961h-20v-20h8c2.209,0,4-1.791,4-4   s-1.791-4-4-4h-8v-5.9961C144,14.1445,148.4863,9.6562,154,9.6562z M154,213.6562c-23.1582,0-42-18.7129-42-41.7148   c0-18.2305,11.7383-34.2031,29.209-39.7461c1.6621-0.5273,2.791-2.0684,2.791-3.8125v-10.7266h8c2.209,0,4-1.791,4-4s-1.791-4-4-4   h-8v-20h8c2.209,0,4-1.791,4-4s-1.791-4-4-4h-8V61.6758h20v66.707c0,1.7441,1.1289,3.2852,2.791,3.8125   c17.4707,5.543,29.209,21.5156,29.209,39.7461C196,194.9434,177.1582,213.6562,154,213.6562z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M36,9.6562c-19.8496,0-36,16.1504-36,36s16.1504,36,36,36s36-16.1504,36-36S55.8496,9.6562,36,9.6562z    M36,73.6562c-15.4395,0-28-12.5605-28-28s12.5605-28,28-28s28,12.5605,28,28S51.4395,73.6562,36,73.6562z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M96,41.6562H80c-2.209,0-4,1.791-4,4s1.791,4,4,4h16c2.209,0,4-1.791,4-4S98.209,41.6562,96,41.6562z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M36,85.6562c-2.209,0-4,1.791-4,4v16c0,2.209,1.791,4,4,4s4-1.791,4-4v-16   C40,87.4473,38.209,85.6562,36,85.6562z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M72.0996,73.1719c-1.5625-1.5625-4.0938-1.5625-5.6562,0c-1.5625,1.5605-1.5625,4.0938,0,5.6562   l11.3125,11.3145c0.7812,0.7812,1.8047,1.1719,2.8281,1.1719s2.0469-0.3906,2.8281-1.1719c1.5625-1.5605,1.5625-4.0938,0-5.6562   L72.0996,73.1719z"
                      />
                      <path
                        fill="#1C71DA"
                        d="M69.2715,19.3145c1.0234,0,2.0469-0.3906,2.8281-1.1719L83.4121,6.8281   c1.5625-1.5625,1.5625-4.0957,0-5.6562c-1.5625-1.5625-4.0938-1.5625-5.6562,0L66.4434,12.4863   c-1.5625,1.5625-1.5625,4.0957,0,5.6562C67.2246,18.9238,68.248,19.3145,69.2715,19.3145z"
                      />
                    </g>
                    <path
                      fill="#FF5D5D"
                      d="M184.3854,80.4884c-1.0239,0-2.0474-0.3906-2.8286-1.1714c-1.562-1.5625-1.562-4.0947,0-5.6572  l14.1421-14.1421c1.5625-1.5615,4.0947-1.5615,5.6572,0c1.562,1.5625,1.562,4.0947,0,5.6572L187.214,79.317  C186.4328,80.0978,185.4093,80.4884,184.3854,80.4884z"
                    />
                    <path
                      fill="#FF5D5D"
                      d="M198.5275,80.4869c-1.0239,0-2.0474-0.3906-2.8286-1.1714L181.5568,65.173  c-1.562-1.5625-1.562-4.0952,0-5.6572c1.5635-1.5615,4.0957-1.561,5.6572,0l14.1421,14.1426c1.562,1.5625,1.562,4.0952,0,5.6572  C200.5748,80.0963,199.5509,80.4869,198.5275,80.4869z"
                    />
                    <path
                      fill="#00D40B"
                      d="M46.3854,196.4884c-7.7197,0-14-6.2803-14-14s6.2803-14,14-14s14,6.2803,14,14  S54.1051,196.4884,46.3854,196.4884z M46.3854,176.4884c-3.3086,0-6,2.6914-6,6s2.6914,6,6,6s6-2.6914,6-6  S49.694,176.4884,46.3854,176.4884z"
                    />
                    <path
                      fill="#FFC504"
                      d="M67.6989,159.1139c-1.0239,0-2.0474-0.3906-2.8286-1.1714L53.5568,146.629  c-1.562-1.5625-1.562-4.0947,0-5.6572l11.3135-11.3135c1.5625-1.5615,4.0952-1.5615,5.6567,0l11.314,11.3135  c0.7505,0.7505,1.1719,1.7676,1.1719,2.8286s-0.4214,2.0781-1.1719,2.8286l-11.314,11.3135  C69.7462,158.7233,68.7223,159.1139,67.6989,159.1139z M62.0421,143.8004l5.6567,5.6567l5.6572-5.6567l-5.6572-5.6567  L62.0421,143.8004z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoe;
