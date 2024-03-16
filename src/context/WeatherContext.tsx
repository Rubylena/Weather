import React, { createContext, useEffect, useState } from "react";
import { IForecastData, IQueryData, IWeatherData } from "../utils/Interface";
import axiosClient, { axiosGeoClient } from "../services/api";
import { WeatherContextData } from "../utils/types";
import { AxiosError } from "axios";

const WeatherContext = createContext<WeatherContextData | null>(null);

const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<IWeatherData>({
    temperature: "",
  });

  const [forecast, setForecast] = useState<IForecastData[]>([{
    weather: [
      {
        id: 0,
        main: "",
        description: "",
        icon: "",
      },
    ],
  }]);

  const fetchWeather = async (
    latitude: number,
    longitude: number
  ): Promise<IWeatherData | AxiosError> => {
    try {
      const response = await axiosClient.get("weather", {
        params: {
          lat: latitude,
          lon: longitude,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      return error as AxiosError;
    }
  };

  const fetchForecast = async (
    latitude: number,
    longitude: number,
    cnt: number
  ): Promise<IForecastData[] | AxiosError> => {
    try {
      const response = await axiosClient.get("forecast", {
        params: {
          lat: latitude,
          lon: longitude,
          cnt: cnt,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      return error as AxiosError;
    }
  };

  const fetchGeo = async (q: string): Promise<IQueryData[] | AxiosError> => {
    try {
      const response = await axiosGeoClient.get("geo/1.0/direct", {
        params: {
          q,
          appid: import.meta.env.VITE_APP_API_ID,
        },
      });
      return response?.data;
    } catch (error: unknown) {
      return error as AxiosError;
    }
  };

  const defaultLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      try {
        const response = await fetchWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeather(response as IWeatherData);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const defaultLocationForecast = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      try {
        const response = await fetchForecast(
          position.coords.latitude,
          position.coords.longitude,
          7
        );
        setForecast(response as IForecastData[]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    defaultLocation();
    defaultLocationForecast();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        forecast,
        setForecast,
        fetchWeather,
        fetchForecast,
        fetchGeo,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
