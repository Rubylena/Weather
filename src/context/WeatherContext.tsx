import React, { createContext, useEffect, useState } from "react";
import { IForecastData, IQueryData, IWeatherData } from "../utils/Interface";
import axiosClient, { axiosGeoClient } from "../services/api";
import { WeatherContextData } from "../utils/types";

const WeatherContext = createContext<WeatherContextData | null>(null);

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<IWeatherData>({
    temperature: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [queryResponse, setQueryResponse] = useState<IQueryData[]>([    {
    lat: 0,
    long: 0,
  },
  {
    lat: 0,
    long: 0,
  },]);
  const [forecast, setForecast] = useState<IForecastData[]>([]);

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("weather", {
        params: {
          lat: lat,
          lon: long,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      setWeather(response?.data);
    } catch (error: unknown) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchForecast = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("forecast", {
        params: {
          lat: lat,
          lon: long,
          cnt: 7,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      setForecast(response?.data);
    } catch (error: unknown) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeo = async (q: string) => {
    setIsLoading(true);
    try {
      const response = await axiosGeoClient.get("geo/1.0/direct", {
        params: {
          q,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      setQueryResponse([
        {
          lat: 0,
          long: 0,
        },
        {
          lat: 0,
          long: 0,
        },
      ]);
      // setQueryResponse(response?.data);
    } catch (error: unknown) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        isLoading,
        error,
        fetchWeather,
        fetchForecast,
        fetchGeo,
        queryResponse,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
