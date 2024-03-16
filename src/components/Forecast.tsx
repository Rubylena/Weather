import React, { useCallback, useEffect, useState } from "react";
import { ICoordProps, IForecastData } from "../utils/Interface";
import { WeatherContext } from "../context/WeatherContext";
import { WeatherContextData } from "../utils/types";

const Forecast = (props: ICoordProps) => {
  const [forecastLoading, setForecastLoading] = useState(false);
  const { fetchForecast, forecast, setForecast } = React.useContext(
    WeatherContext
  ) as WeatherContextData;
  const { lat, long } = props;

  const handleSearchForecast = useCallback(
    async (lat: number, long: number) => {
      setForecastLoading(true);

      try {
        const data = await fetchForecast(lat, long, 5);
        setForecast(data as IForecastData[]);
      } catch (error: unknown) {
        console.log("error", error);
        // toast.error(error?.response?.message);
      } finally {
        setForecastLoading(false);
      }
    },
    [fetchForecast, setForecast]
  );

  //    lastly call the fetchForecast function

  useEffect(() => {
    if (lat && long) {
      handleSearchForecast(lat, long);
    }
  }, [lat, long]);

  return (
    <div>
      {(forecast.length > 0 || forecastLoading) &&
        forecast.map((cast) => (
          <p key={cast.weather[0].id}>Forecast: {cast.weather[0].description}</p>
        ))}
    </div>
  );
};

export default Forecast;
