import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IWeatherData } from "../utils/Interface";
import { WeatherContextData } from "../utils/types";
import { WeatherContext } from "../context/WeatherContext";
import { toast } from "react-toastify";

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
        const data = await fetchWeather(lat, long, "metric");
        setWeather(data as IWeatherData);
      } catch (error: unknown) {
        toast.error(error?.response?.message);
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
    <>
      {weatherLoading && (
        <div>
          <p>Celsius</p>
          <p>Fahrenheit</p>

          <p>Temperature: *deg (C if celsius, F if Fahrenheit is selected)</p>
          <p>humidity: %</p>
          <p>feels like: </p>
          <p>wind: m/s or km/h</p>
          <p>visibility: </p>
          <p>pressure: </p>
          <p>description: </p>
          <p>sunrise: (date)</p>
          <p>sunset: (date)</p>
          <p>
            icon:{" "}
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt="weather icon"
            />{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
