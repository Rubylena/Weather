import React, { useCallback, useEffect, useState } from "react";
import {
  IDailyWeatherData,
  ICoordProps,
  IForecastData,
} from "../utils/Interface";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { AxiosError } from "axios";
import degToCompass from "../utils/compass";
import { options } from "../utils/utils";
import { dailyDataExtraction } from "../utils/dailyData";

const Forecast = (props: ICoordProps) => {
  const [forecastLoading, setForecastLoading] = useState(false);
  const [rearrangedDailyForecast, setRearrangedDailyForecast] = useState<
    IDailyWeatherData[]
  >([]);
  const { fetchForecast, forecast, setForecast, defaultForecastLoading } =
    React.useContext(WeatherContext) as WeatherContextData;
  const { lat, long, units } = props;

  const handleSearchForecast = useCallback(
    async (lat: number, long: number, units: string) => {
      setForecastLoading(true);

      try {
        const data = await fetchForecast(lat, long, units);
        setForecast(data as IForecastData[]);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
        setForecastLoading(false);
      }
    },
    [fetchForecast, setForecast]
  );

  const collectDaily = async (forecast: IForecastData[]) => {
    const response = await dailyDataExtraction(forecast);
    setRearrangedDailyForecast(response);
  };

  useEffect(() => {
    if (lat && long && units) {
      handleSearchForecast(lat, long, units);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long, units]);

  useEffect(() => {
    if (forecast) {
      collectDaily(forecast);
    }
  }, [forecast]);

  return (
    <div>
      {defaultForecastLoading || forecastLoading ? (
        <Skeleton height="35rem" />
      ) : rearrangedDailyForecast && rearrangedDailyForecast?.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center text-gray-50">
          {rearrangedDailyForecast.map((cast, index) => (
            <div
              key={index}
              className="w-full sm:w-96 rounded-lg shadow drop-shadow p-2 bg-[#3f7296]"
            >
              <p className="text-center font-semibold py-2 text-xl">
                {new Date(cast.date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {cast.data.slice(2, 4).map((item, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-44 rounded-lg border border-gray-50 border-opacity-20 shadow-gray-400 shadow p-2 drop-shadow"
                  >
                    <p className="text-right text-sm">
                      {new Date(item.dt * 1000).toLocaleTimeString(
                        "en-GB",
                        options
                      )}
                    </p>
                    <div className="flex gap-1 items-center">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}.png`}
                        alt="weather icon"
                      />
                      <p className="font-medium text-lg">
                        {Math.ceil(item.main.temp)}&deg;
                        {units === "metric" ? "C" : "F"}
                      </p>
                    </div>
                    <p className="capitalize">{item.weather[0].description}</p>

                    <p>Humidity: {item.main.humidity}%</p>
                    <p>
                      Wind: {item.wind.gust}
                      {units === "metric" ? "m/s" : "mph"}{" "}
                      {degToCompass(item.wind.deg)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton height="20rem" />
      )}
    </div>
  );
};

export default Forecast;
