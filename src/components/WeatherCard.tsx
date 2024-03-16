import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IWeatherData } from "../utils/Interface";
import { WeatherContextData } from "../utils/types";
import { WeatherContext } from "../context/WeatherContext";

const WeatherCard = (props: ICoordProps) => {
  const [weatherLoading, setWeatherLoading] = useState(false);
  const { fetchWeather, weather, setWeather } = React.useContext(
    WeatherContext
  ) as WeatherContextData;
  const { lat, long } = props;

  const handleSearchWeather = useCallback(
    async (lat: number, long: number) => {
      setWeatherLoading(true);

      try {
        const data = await fetchWeather(lat, long);
        setWeather(data as IWeatherData);
      } catch (error: unknown) {
        console.log("error", error);
        // toast.error(error?.response?.message);
      } finally {
        setWeatherLoading(false);
      }
    },
    [fetchWeather, setWeather]
  );

  //   when selected the long and lat from the selected query response is inputted into the weather function. Done
  //   call the fetchWeather function with the selected lon and lat. Done
  useEffect(() => {
    if (lat && long) {
      handleSearchWeather(lat, long);
    }
  }, [lat, long]);

  return (
    <div>
      {(weather || weatherLoading) && <p>default: {weather?.main?.temp}</p>}
    </div>
  );
};

export default WeatherCard;
