import React from "react";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import Search from "../components/Search";

const Home = () => {
  const { fetchWeather, fetchForecast, fetchGeo } = React.useContext(
    WeatherContext
  ) as WeatherContextData;

  return (
    <div className="flex flex-col gap-10">
      <p>Home</p>
      <button onClick={() => fetchWeather()}>get weather</button>
      <button onClick={() => fetchForecast()}>get forecast</button>
      <button onClick={() => fetchGeo('Lagos, Ng')}>get Geo</button>

      <Search />
    </div>
  );
};

export default Home;
