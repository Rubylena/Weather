import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IWeatherData } from "../utils/Interface";
import { WeatherContextData } from "../utils/types";
import { WeatherContext } from "../context/WeatherContext";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { AxiosError } from "axios";

const WeatherCard = (props: ICoordProps) => {
  const [weatherLoading, setWeatherLoading] = useState(false);
  const { fetchWeather, weather, setWeather, defaultWeatherLoading } =
    React.useContext(WeatherContext) as WeatherContextData;
  const { lat, long, units } = props;

  const handleSearchWeather = useCallback(
    async (lat: number, long: number, units: string) => {
      setWeatherLoading(true);

      try {
        const data = await fetchWeather(lat, long, units);
        setWeather(data as IWeatherData);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setWeatherLoading(false);
      }
    },
    [fetchWeather, setWeather]
  );

  useEffect(() => {
    if (lat && long && units) {
      handleSearchWeather(lat, long, units);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long, units]);

  return (
    <>
      {defaultWeatherLoading || weatherLoading ? (
        <Skeleton count={10} />
      ) : weather ? (
        <div>
          <p>
            Temperature: {weather.main.temp}*deg $
            {units === "metric" ? "C" : "F"}(C if celsius, F if Fahrenheit is
            selected)
          </p>
          <p>humidity: {weather.main.humidity}%</p>
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
      ) : (
        <Skeleton count={10} />
      )}
    </>
  );
};

export default WeatherCard;
