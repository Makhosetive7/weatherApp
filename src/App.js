import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WeatherInfoe from "./Pages/WeatherInfoe"
import SearchedLocation from "./Pages/SearchedLocation"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<WeatherInfoe/>} />
        <Route path="/search/:city" element={<SearchedLocation/>} />
      </Routes>
    </div>
  );
}

export default App;
