import './App.css';
import { Route, Routes } from 'react-router-dom';
import WeatherInfoe from "./Pages/WeatherInfoe"
import Home from "./Pages/Home"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/weatherInfoe" exact element={<WeatherInfoe/>} />
      </Routes>
    </div>
  );
}

export default App;
