import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IForecastData } from "../utils/Interface";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { AxiosError } from "axios";

const Forecast = (props: ICoordProps) => {
  const [forecastLoading, setForecastLoading] = useState(false);
  const { fetchForecast, forecast, setForecast, defaultForecastLoading } =
    React.useContext(WeatherContext) as WeatherContextData;
  const { lat, long } = props;

  const handleSearchForecast = useCallback(
    async (lat: number, long: number) => {
      setForecastLoading(true);

      try {
        const data = await fetchForecast(lat, long, "metric");
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

  useEffect(() => {
    if (lat && long) {
      handleSearchForecast(lat, long);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  return (
    <div>
      {defaultForecastLoading || forecastLoading ? (
        <Skeleton count={20} />
      ) : forecast && forecast?.length > 0 ? (
        forecast.map((cast, index) => (
          <div key={index}>
            <p>Forecast: {cast.weather[0].description}</p>
            <p>Forecast: {cast.dt_txt}</p>
          </div>
        ))
      ) : (
        <Skeleton count={20} />
      )}
    </div>
  );
};

export default Forecast;
