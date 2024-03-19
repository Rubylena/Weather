import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IWeatherData } from "../utils/Interface";
import { WeatherContextData } from "../utils/types";
import { WeatherContext } from "../context/WeatherContext";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { AxiosError } from "axios";
import degToCompass from "../utils/compass";
import { options } from "../utils/utils";

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
        <Skeleton count={14} />
      ) : weather ? (
        <div className="text-gray-50 flex flex-col gap-1">
          <div className="flex flex-wrap gap-2 items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
              alt="weather icon"
            />
            <p className="font-bold text-xl md:text-3xl">
              {Math.ceil(weather.main.temp)}&deg;
              {units === "metric" ? "C" : "F"}
            </p>
          </div>
          <h4 className="text-3xl">
            {weather.name}
            {weather.sys.country && `, ${weather.sys.country}`}
          </h4>

          <p>
            Feels like: {Math.ceil(weather.main.feels_like)}&deg;
            {units === "metric" ? "C" : "F"}, {weather.weather[0].description}
          </p>
          <p>
            {new Date(weather.dt * 1000).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>

          <p>
            Wind: {weather.wind.gust}
            {units === "metric" ? "m/s" : "mph"}
            {degToCompass(weather.wind.deg)}
          </p>
          <p>Visibility: {weather.visibility}km</p>
          <p>Pressure: {weather.main.pressure}hPa</p>
          <p>
            Sunrise:{" "}
            {new Date(weather.sys.sunrise * 1000).toLocaleString(
              "en-GB",
              options
            )}
          </p>
          <p>
            Sunset:{" "}
            {new Date(weather.sys.sunset * 1000).toLocaleString(
              "en-GB",
              options
            )}
          </p>
        </div>
      ) : (
        <Skeleton count={14} />
      )}
    </>
  );
};

export default WeatherCard;
